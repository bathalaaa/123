import React from "react";
import { AbsoluteFill } from "remotion";
import { StreetBackdrop } from "../assets/Backdrop";
import { Cart } from "../assets/Cart";
import { ChaiSeller } from "../assets/ChaiSeller";
import { Customer } from "../assets/Customer";
import { IdleBob } from "../components/IdleBob";
import { PopIn } from "../components/PopIn";
import { SlowZoom } from "../components/SlowZoom";
import { colors } from "../theme";

// Seller head position on screen, used as zoom origin.
export const SELLER_FOCUS = "800px 470px";

// Shared street-corner layout so the stall and seller look identical across scenes.
export const StallLayout: React.FC<{
  zoomFrom?: number;
  zoomTo?: number;
  origin?: string;
  popCart?: boolean;
  wave?: number;
  customers?: boolean;
}> = ({ zoomFrom = 1, zoomTo = 1.05, origin = "50% 60%", popCart = false, wave = 0, customers = true }) => {
  const stall = (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}>
      <div style={{ position: "absolute", left: 670, top: 349 }}>
        <IdleBob amount={4} period={54}>
          <ChaiSeller width={260} wave={wave} legs={false} />
        </IdleBob>
      </div>
      <div style={{ position: "absolute", left: 380, top: 252 }}>
        <Cart width={640} />
      </div>
    </div>
  );
  return (
    <SlowZoom from={zoomFrom} to={zoomTo} origin={origin}>
      <StreetBackdrop />
      {customers ? (
        <>
          <div style={{ position: "absolute", left: 90, top: 470 }}>
            <IdleBob amount={3} period={70} phase={20}>
              <Customer width={170} holdingCup />
            </IdleBob>
          </div>
          <div style={{ position: "absolute", left: 1090, top: 500 }}>
            <IdleBob amount={3} period={64} phase={5}>
              <Customer width={155} tint={colors.chai} />
            </IdleBob>
          </div>
        </>
      ) : null}
      {popCart ? (
        <PopIn origin="700px 880px" style={{ position: "absolute", inset: 0 }}>
          {stall}
        </PopIn>
      ) : (
        <AbsoluteFill>{stall}</AbsoluteFill>
      )}
    </SlowZoom>
  );
};
