import { createSlice } from "@reduxjs/toolkit";

// constants
import { INIT_POSITION } from "../../constants";

// type
import { RootState } from "..";
import { GameState, Position } from "../../types";

export type GameStateType = {
    gameResult: "WINNER" | "LOSER" | null;
    position: Position;
    isPlaying: GameState;
    isReady: boolean;
    nickName: string;
    id: string;
    timeFrame: number;
    score: number;
};

const initialState: GameStateType = {
    isPlaying: "stop",
    position: INIT_POSITION,
    isReady: false,
    gameResult: null,
    nickName: "",
    id: "",
    timeFrame: 1,
    score: 0,
};

export const gameStateSlice = createSlice({
    name: "nextBlock",
    initialState,
    reducers: {
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },

        setPosition: (state, action) => {
            state.position.x += action.payload.x;
            state.position.y += action.payload.y;
        },

        setResetPostion: (state, action) => {
            state.position = action.payload;
        },

        setReady: (state, action) => {
            state.isReady = action.payload;
        },

        setGameResult: (state, action) => {
            state.gameResult = action.payload;
        },

        setId: (state, action) => {
            state.id = action.payload;
        },

        setNickName: (state, action) => {
            state.nickName = action.payload;
        },

        setTimeFrame: (state, action) => {
            state.timeFrame = action.payload;
        },

        setScore: (state, action) => {
            state.score = action.payload;
        },
    },
});

// export actions
export const {
    setPosition,
    setIsPlaying,
    setResetPostion,
    setReady,
    setGameResult,
    setNickName,
    setId,
    setTimeFrame,
    setScore,
} = gameStateSlice.actions;

// export states
export const gameState = (state: RootState) => state.gameState;

export default gameStateSlice.reducer;
