import { Layout, Length, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
    all,
    createRef,
    createSignal,
    range,
    useScene,
    waitUntil,
} from "@motion-canvas/core";
import { SceneDefaults } from "../components/scene-defaults";
import { TitledScene } from "../components/titled-scene";
import { useColors } from "../utils/variables";

export default makeScene2D(function* (view) {
    const colors = useColors();

    view.fill(colors.bgPrimary);

    const timeline = createRef<Layout>();

    const sharedTimeline = createRef<Rect>();
    const redTimeline = createRef<Rect>();
    const yellowTimeline = createRef<Rect>();

    const timelineWidth = createSignal(1000);
    const numRects = createSignal(10);

    view.add(
        <SceneDefaults>
            <TitledScene title="Async">
                <Layout
                    direction="column"
                    width={() => timelineWidth()}
                    gap={20}
                    fontFamily={"Manrope"}
                    fontSize={32}
                    ref={timeline}
                    opacity={0}
                >
                    <Txt fill={colors.fgPrimary}>CPU Timeline</Txt>
                    <Rect
                        stroke={colors.fgSecondary}
                        lineWidth={2}
                        padding={4}
                        width="100%"
                        height={80}
                        radius={4}
                        marginBottom={40}
                        ref={sharedTimeline}
                    >
                        {() =>
                            range(numRects()).map(() => (
                                <Rect
                                    width="0%"
                                    opacity={0}
                                    radius={4}
                                />
                            ))
                        }
                    </Rect>
                    <Txt fill={colors.fgPrimary}>Function 1</Txt>
                    <Rect
                        stroke={colors.fgSecondary}
                        lineWidth={2}
                        padding={4}
                        width="100%"
                        height={80}
                        radius={4}
                        ref={redTimeline}
                    >
                        {() =>
                            range(numRects()).map(() => (
                                <Rect width="0%" opacity={0} radius={4} />
                            ))
                        }
                    </Rect>
                    <Txt fill={colors.fgPrimary}>Function 2</Txt>
                    <Rect
                        stroke={colors.fgSecondary}
                        lineWidth={2}
                        padding={4}
                        width="100%"
                        height={80}
                        radius={4}
                        ref={yellowTimeline}
                    >
                        {() =>
                            range(numRects()).map(() => (
                                <Rect width="0%" opacity={0} radius={4} />
                            ))
                        }
                    </Rect>
                </Layout>
            </TitledScene>
        </SceneDefaults>
    );

    const applyBlock = (
        { func, width }: { func: string; width: number },
        timeline: string,
        rect: Rect,
        time: number
    ) => {
        const visible =
            func === timeline || (timeline === "shared" && func !== "spacer");
        return all(
            rect.width(width as Length, time),
            rect.fill(func === "red" ? colors.fgAccentRed : colors.fgAccentYellow, time),
            visible ? rect.opacity(1, time) : rect.opacity(0, time),
            visible ? rect.margin([0, 2], time) : rect.margin(0, time)
        );
    };

    yield* waitUntil("cpu");
    yield* timeline().opacity(1, 0.5);

    const sharedBlocks = sharedTimeline().childrenAs<Rect>();
    const redBlocks = redTimeline().childrenAs<Rect>();
    const yellowBlocks = yellowTimeline().childrenAs<Rect>();

    const applyAllBlocks = (sizes: { func: string; width: number }[]) => {
        return all(
            ...sharedBlocks.map((block, i) =>
                applyBlock(
                    sizes[i] ?? { func: "spacer", width: 0 },
                    "shared",
                    block,
                    0.5
                )
            ),
            ...redBlocks.map((block, i) =>
                applyBlock(
                    sizes[i] ?? { func: "spacer", width: 0 },
                    "red",
                    block,
                    0.5
                )
            ),
            ...yellowBlocks.map((block, i) =>
                applyBlock(
                    sizes[i] ?? { func: "spacer", width: 0 },
                    "yellow",
                    block,
                    0.5
                )
            )
        );
    };

    const oneFunction = [{ func: "red", width: timelineWidth() }];

    yield* waitUntil("onefunc");
    yield* applyAllBlocks(oneFunction);

    const twoFunctions = [
        { func: "red", width: timelineWidth() / 2 },
        { func: "yellow", width: timelineWidth() / 2 },
    ];

    yield* waitUntil("sequential");
    yield* applyAllBlocks(twoFunctions);

    const singularAsync = [
        { func: "red", width: timelineWidth() / 3 },
        { func: "spacer", width: timelineWidth() / 3 },
        { func: "red", width: timelineWidth() / 3 },
    ];

    yield* waitUntil("one async");
    yield* applyAllBlocks(singularAsync);

    const doubleAsync = [
        { func: "red", width: timelineWidth() / 3 },
        { func: "yellow", width: timelineWidth() / 3 },
        { func: "red", width: timelineWidth() / 3 },
    ];

    yield* waitUntil("two async");
    yield* applyAllBlocks(doubleAsync);

    const concurrent = [
        { func: "red", width: (timelineWidth() * 3) / 20 },
        { func: "yellow", width: (timelineWidth() * 1) / 20 },
        { func: "red", width: (timelineWidth() * 2) / 20 },
        { func: "yellow", width: (timelineWidth() * 3) / 20 },
        { func: "red", width: (timelineWidth() * 1) / 20 },
        { func: "yellow", width: (timelineWidth() * 2) / 20 },
        { func: "red", width: (timelineWidth() * 1) / 20 },
        { func: "yellow", width: (timelineWidth() * 2) / 20 },
        { func: "red", width: (timelineWidth() * 4) / 20 },
        { func: "yellow", width: (timelineWidth() * 1) / 20 },
    ];
    yield* waitUntil("concurrent");
    yield* applyAllBlocks(concurrent);

    yield* waitUntil("end");
});
