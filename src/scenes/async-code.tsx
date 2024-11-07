import { Code, lines, makeScene2D, Rect } from "@motion-canvas/2d";
import { useColors } from "../utils/variables";
import { SceneDefaults } from "../components/scene-defaults";
import { TitledScene } from "../components/titled-scene";
import { all, createRef, DEFAULT, Direction, slideTransition, waitFor, waitUntil } from "@motion-canvas/core";

const workingCode = `\
async fn example() {
    sleep(Duration::from_secs(1)).await;

    for _ in 0..10 {
        println!("Hello, world!");
        sleep(Duration::from_secs(1)).await;
    }
    
    let mutex = Mutex::new(0);
    let mut guard = mutex.lock().await;
}`;

const brokenCode = `\
async fn example() {
    sleep(Duration::from_secs(1)).await;

    loop {
        println!("Hello, world!");
    }
}`;

const fixedCode = `\
async fn example() {
    sleep(Duration::from_secs(1)).await;

    loop {
        println!("Hello, world!");
        sleep(Duration::from_millis(1)).await;
    }
}`;

export default makeScene2D(function* (view) {
    const colors = useColors();

    const code = createRef<Code>();

    view.fill(colors.bgPrimary);
    view.add(
        <SceneDefaults>
            <TitledScene title="Async Examples">
                <Rect radius={4} fill="#24292e" stroke={colors.bgSecondary} lineWidth={1} padding={10} width={800}>
                    <Code
                        fontSize={32}
                        fontFamily={"Iosevka"}
                        ref={code}
                        code={workingCode}
                    />
                </Rect>
            </TitledScene>
        </SceneDefaults>
    );

    yield* slideTransition(Direction.Right);

    yield* waitUntil("highlight");
    // Highlight all lines with async
    yield* code().selection(code().findAllRanges(/await/g).map(range => lines(range[0][0])), 0.3);

    yield* waitUntil("broken");
    // Reset the highlight
    yield* code().selection(DEFAULT, 0.3);
    // Swith to the broken code
    yield* code().code(brokenCode, 1);

    yield* waitUntil("broken highlight");
    yield* code().selection(lines(3, 5), 0.3);

    yield* waitUntil("fix");
    yield* all(code().selection(lines(3, 6), 0.3), code().code(fixedCode, 1));

    yield* waitUntil("end");
});