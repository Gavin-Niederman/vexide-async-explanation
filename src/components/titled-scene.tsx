import {
    initial,
    NodeProps,
    signal,
    Node,
    Grid,
    Layout,
} from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, useScene } from "@motion-canvas/core";
import { Title } from "./title";

export interface TitledSceneProps extends NodeProps {
    title?: SignalValue<string>;
}

export class TitledScene extends Node {
    @initial(null)
    @signal()
    public declare readonly title: SimpleSignal<string, this>;

    public constructor(props?: TitledSceneProps) {
        super({ ...props });

        let children = this.children();
        this.add(
            <Layout
                layout
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                height="100%"
                padding={128}
            >
                <Title text={this.title} />
                <Layout
                    layout
                    direction="column"
                    fontFamily="Manrope"
                    gap={42}
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                >
                    {children}
                </Layout>
            </Layout>
        );
    }
}
