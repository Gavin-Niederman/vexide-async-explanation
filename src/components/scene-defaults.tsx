import {
    initial,
    NodeProps,
    signal,
    Node,
    Grid,
    Layout,
} from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, useScene } from "@motion-canvas/core";

export interface SceneDefaultsProps extends NodeProps {
    fontFamily?: SignalValue<string>;
}

export class SceneDefaults extends Node {
    @initial("Manrope")
    @signal()
    public declare readonly fontFamily: SimpleSignal<string, this>;

    public constructor(props?: SceneDefaultsProps) {
        super({ ...props });

        let variables = useScene().variables;

        let children = this.children();
        this.add(
            <Layout layout={false} fontFamily={this.fontFamily()}>
                <Grid
                    width={"100%"}
                    height={"100%"}
                    stroke={variables.get("grid", "#000")}
                    lineWidth={1}
                    antialiased={false}
                    spacing={30}
                    start={0}
                    end={1}
                />
                <Node>{children}</Node>
            </Layout>
        );
    }
}
