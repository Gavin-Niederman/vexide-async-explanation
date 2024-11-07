import { Circle, Layout, makeScene2D, Txt } from "@motion-canvas/2d";
import {
    createRef,
    createSignal,
    useScene,
    waitUntil,
} from "@motion-canvas/core";
import { SceneDefaults } from "../components/scene-defaults";
import { Title } from "../components/title";
import { TitledScene } from "../components/titled-scene";
import { useColors } from "../utils/variables";

export default makeScene2D(function* (view) {
    const colors = useColors();

    let revealed = createSignal([0, 0, 0]);
    let book = createRef<Txt>();

    view.fill(useScene().variables.get("bgPrimary", "#000"));
    view.add(
        <SceneDefaults>
            <TitledScene title="Rust Resources">
                <Txt ref={book} fill={colors.fgPrimary} opacity={() => revealed()[0]}>
                    The Rust Book
                </Txt>
                <Txt fill={colors.fgPrimary} opacity={() => revealed()[1]}>
                    Rust by Example
                </Txt>
                <Txt fill={colors.fgPrimary} opacity={() => revealed()[2]}>
                    Rustlings
                </Txt>
            </TitledScene>
        </SceneDefaults>
    );

    yield* waitUntil("book");
    yield* revealed([1, 0, 0], 0.2);
    yield* waitUntil("example");
    yield* revealed([1, 1, 0], 0.2);
    yield* waitUntil("rustlings");
    yield* revealed([1, 1, 1], 0.2);

    yield* waitUntil("favorite");
    yield* book().fill(useScene().variables.get("fgAccentYellow", "#FF0"), 0.3);

    yield* waitUntil("end");
});
