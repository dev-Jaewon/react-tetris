import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-component
import * as S from "./style";

//store
import {
    gameState,
    setIsPlaying,
    setReady,
    setGameResult,
} from "../../store/reducer/gameState";

//component
import { NextBlock } from "../NextBlock";
import { Button } from "../Button";
import { Board } from "../Board";
import { Timer } from "../Timer";
import { GameResult } from "../GameResult";
import { Level } from "../Level";
import { Score } from "../Score";

//type
import { PlayerTypes } from "../../hooks/usePlayer";

type PlayerType = {
    players: PlayerTypes[];
    render: string[][];
    randomSession: () => void;
    newSession: () => void;
};

export const Player = (props: PlayerType) => {
    const dispatch = useDispatch();

    const { isReady, isPlaying, gameResult } = useSelector(gameState);

    useEffect(() => {
        if (isPlaying !== "playing") return;

        if (!IsPlayersState("isPlaying", "playing")) {
            dispatch(setGameResult("WINNER"));
            dispatch(setIsPlaying("end"));
            dispatch(setReady(false));
        }
    }, [props.players]);

    const executeFn = () => {
        dispatch(setIsPlaying("playing"));
    };

    const handleClickButton = () => {
        dispatch(setReady(!isReady));
    };

    const IsPlayersState = useCallback(
        (key: string, value: any) => {
            return props.players.every((player: any) => player[key] === value);
        },
        [props.players]
    );

    return (
        <S.PlayerContainer>
            <div>
                <S.BoardContainer>
                    <Board render={props.render} cellSize={30} grid />
                </S.BoardContainer>

                {isPlaying !== "playing" && (
                    <Button onClick={handleClickButton}>
                        {!props.players.length ? (
                            !isReady ? (
                                "μμνκΈ°"
                            ) : (
                                <Timer executeFn={executeFn} />
                            )
                        ) : !isReady ? (
                            "μ€λΉνκΈ°"
                        ) : IsPlayersState("isReady", true) ? (
                            <Timer executeFn={executeFn} />
                        ) : (
                            "ν΄μ νκΈ°"
                        )}
                    </Button>
                )}

                {isPlaying !== "playing" && (
                    <GameResult gameResult={gameResult} />
                )}
            </div>
            <section>
                <Level />
                <Score />
                <NextBlock />
                <button onClick={props.randomSession}>λλ€λ§€μΉ­</button>
                <button onClick={props.newSession}>μλ‘λ§λ€κΈ°</button>
            </section>
        </S.PlayerContainer>
    );
};
