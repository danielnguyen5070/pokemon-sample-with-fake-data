import { call, put, takeLatest, delay, race, take, cancelled } from "redux-saga/effects";
import {
    fetchPokemonDetailRequest,
    fetchPokemonDetailSuccess,
    fetchPokemonDetailFailure,
    startAutoRefresh,
    stopAutoRefresh,
} from "../slices/pokemonDetailSlice";
import { fetchPokemonDetail } from "../api/pokemonDetailAPI";
import type { PayloadAction } from "@reduxjs/toolkit";


// One-shot fetch (keep if you still use it elsewhere)
function* handleFetchPokemonDetail(action: PayloadAction<string>) {
    try {
        const data: Awaited<ReturnType<typeof fetchPokemonDetail>> = yield call(
            fetchPokemonDetail,
            action.payload
        );
        yield put(fetchPokemonDetailSuccess(data));
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        yield put(fetchPokemonDetailFailure(message));
    }
}

// 🔁 Auto-refresh worker: polls every 10s, can be stopped any time
function* autoRefreshPokemonDetail(action: PayloadAction<string>): Generator {
    const name = action.payload;

    try {
        while (true) {
            // Race the API call against a stop signal — if stop happens, exit immediately.
            const { response, stopped } = yield race({
                response: call(fetchPokemonDetail, name),
                stopped: take(stopAutoRefresh.type),
            });

            if (stopped) break;

            try {
                yield put(fetchPokemonDetailSuccess(response));
            } catch {
                // If response typing fails or unexpected, normalize gracefully
                yield put(fetchPokemonDetailFailure("Failed to parse response"));
            }

            // Wait 10s before next poll, but allow immediate cancel
            const { stoppedDuringWait } = yield race({
                wait: delay(10000),
                stoppedDuringWait: take(stopAutoRefresh.type),
            });

            if (stoppedDuringWait) break;
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        yield put(fetchPokemonDetailFailure(message));
    } finally {
        // Triggered if the task is cancelled by takeLatest (e.g., route change -> stopAutoRefresh)
        if (yield cancelled()) {
            // optional: console.debug("Auto-refresh saga cancelled");
        }
    }
}

export default function* pokemonSaga() {
    // Keep existing one-shot behavior (if you still dispatch fetchPokemonDetailRequest)
    yield takeLatest(fetchPokemonDetailRequest.type, handleFetchPokemonDetail);

    // Run exactly one auto-refresh loop at a time; new start cancels the previous
    yield takeLatest(startAutoRefresh.type, autoRefreshPokemonDetail);
}