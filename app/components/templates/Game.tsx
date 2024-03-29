"use client";

import { lazy, memo } from "react";

import { useTetris } from "../../hooks/useTetris";

import { Player } from "../organisms/Player";

import { usePlayer } from "../../hooks/usePlayer";
import { OtherUser } from "../organisms/OtherUser";
import { withErrorBoundaryAndSuspense } from "../utils/ErrorSuspense";
import { useSelector } from "react-redux";
import { gameState } from "../../store/reducer/gameState";

// const ChatComponent = memo(
//   withErrorBoundaryAndSuspense(
//     lazy(() => import("chatModule/Chat")),
//     <div>로딩중...</div>,
//     (error, errorInfo) => {
//       console.error("An error occurred in MyComponent", error, errorInfo);
//     }
//   )
// );

export const Tetris = () => {
  const { render } = useTetris();
  const { nickName } = useSelector(gameState);
  const { players, randomSession, newSession } = usePlayer(render);

  return (
    <div className="flex justify-center w-full h-[765px] gap-[30px]">
      <OtherUser players={players} />
      <Player
        players={players}
        render={render}
        randomSession={randomSession}
        newSession={newSession}
      />
      {/* <ChatComponent nickName={nickName} /> */}
    </div>
  );
};
