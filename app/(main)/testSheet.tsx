import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BLOCK_SIZE = 124;
const NAVBAR_OFFSET = 72;

const Block = (props) => {
  const x = props.body.position.x - BLOCK_SIZE / 2;
  const y = props.body.position.y - BLOCK_SIZE / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: BLOCK_SIZE,
        height: BLOCK_SIZE,
        backgroundColor: props.color || "#ffa500",
        borderRadius: 6,
      }}
    />
  );
};

const createBlock = (world, id, x, y) => {
  const body = Matter.Bodies.rectangle(x, y, BLOCK_SIZE, BLOCK_SIZE, {
    restitution: 0.3,
    friction: 0.1,
  });
  Matter.World.add(world, [body]);

  return {
    body,
    size: [BLOCK_SIZE, BLOCK_SIZE],
    color: "#ffa500",
    renderer: <Block />,
  };
};

export default function JarWithPhysics() {
  const engine = useRef(
    Matter.Engine.create({ enableSleeping: false })
  ).current;
  const world = engine.world;

  const [entities, setEntities] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    // Create floor

    // In useEffect()

    const floor = Matter.Bodies.rectangle(
      SCREEN_WIDTH / 2,
      SCREEN_HEIGHT - NAVBAR_OFFSET,
      SCREEN_WIDTH,
      50,
      { isStatic: true }
    );

    Matter.World.add(world, [floor]);

    // Create blocks
    const blocks = {};
    for (let i = 0; i < 3; i++) {
      const x = Math.random() * (SCREEN_WIDTH - BLOCK_SIZE);
      const y = Math.random() * 150;
      blocks["block" + i] = createBlock(world, `block${i}`, x, y);
    }

    setEntities({
      physics: { engine, world },
      ...blocks,
    });
  }, []);

  if (!entities) {
    // Render nothing until entities are initialized
    return <View style={styles.container} />;
  }

  return (
    <GameEngine
      style={styles.container}
      systems={[physicsLoop]}
      entities={entities}
    />
  );
}

const physicsLoop = (entities, { time }) => {
  const engine = entities.physics?.engine;
  if (engine) {
    Matter.Engine.update(engine, time.delta);
  }
  return entities;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef9ef",
  },
});
