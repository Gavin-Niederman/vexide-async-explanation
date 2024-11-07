import {
    initial,
    NodeProps,
    signal,
    Node,
    Grid,
    Layout,
    Txt,
} from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, useScene } from "@motion-canvas/core";

export interface TitleProps extends NodeProps {
    text: SignalValue<string>;
}

export class Title extends Node {
    @initial(null)
    @signal()
    public declare readonly text: SimpleSignal<string, this>;

    public constructor(props?: TitleProps) {
        super({ ...props });

        this.add(
            <Txt
                text={this.text}
                fontFamily={"Iosevka"}
                fontStyle="ultralight"
                fontWeight={200}
                fontSize={125}
                fill={useScene().variables.get("fgPrimary", "#FFF")}
            />
        );
    }
}
