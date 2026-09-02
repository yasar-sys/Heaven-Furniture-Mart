import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox } from "@react-three/drei";
import { memo, useMemo } from "react";
import * as THREE from "three";

export type ScenePiece = "Sofa" | "Bed" | "Wardrobe" | "Dining Table";

type Props = {
  piece: ScenePiece;
  fabric: string;
  wood: string;
  /** 0..1 width factor */
  span: number;
};

/** Shared materials, rebuilt only when a colour actually changes. */
function useMaterials(fabric: string, wood: string) {
  return useMemo(() => {
    const fabricMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(fabric),
      roughness: 0.86,
      metalness: 0.02,
    });
    const cushionMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(fabric).offsetHSL(0, 0, 0.06),
      roughness: 0.92,
    });
    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(wood),
      roughness: 0.45,
      metalness: 0.12,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c8a151"),
      roughness: 0.28,
      metalness: 0.9,
    });
    return { fabricMat, cushionMat, woodMat, brassMat };
  }, [fabric, wood]);
}

const Sofa = memo(function Sofa({ w, m }: { w: number; m: ReturnType<typeof useMaterials> }) {
  const seats = Math.max(2, Math.round(w / 0.85));
  return (
    <group>
      <RoundedBox args={[w, 0.34, 0.95]} radius={0.06} smoothness={3} position={[0, 0.46, 0]} material={m.fabricMat} />
      {Array.from({ length: seats }).map((_, i) => (
        <RoundedBox
          key={i}
          args={[w / seats - 0.06, 0.16, 0.85]}
          radius={0.06}
          smoothness={3}
          position={[-w / 2 + (w / seats) * (i + 0.5), 0.7, 0.02]}
          material={m.cushionMat}
        />
      ))}
      <RoundedBox args={[w, 0.72, 0.24]} radius={0.08} smoothness={3} position={[0, 0.85, -0.42]} material={m.fabricMat} />
      {[-1, 1].map((s) => (
        <RoundedBox
          key={s}
          args={[0.22, 0.66, 0.95]}
          radius={0.08}
          smoothness={3}
          position={[s * (w / 2 + 0.09), 0.62, 0]}
          material={m.fabricMat}
        />
      ))}
      {[
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ].map(([sx, sz], i) => (
        <mesh key={i} position={[(sx as number) * (w / 2 - 0.1), 0.14, (sz as number) * 0.38]} material={m.woodMat}>
          <cylinderGeometry args={[0.045, 0.03, 0.28, 12]} />
        </mesh>
      ))}
    </group>
  );
});

const Bed = memo(function Bed({ w, m }: { w: number; m: ReturnType<typeof useMaterials> }) {
  const d = 2.1;
  return (
    <group>
      <RoundedBox args={[w, 1.1, 0.16]} radius={0.06} smoothness={3} position={[0, 0.95, -d / 2]} material={m.fabricMat} />
      {[0, 1, 2].map((i) => (
        <RoundedBox
          key={i}
          args={[w / 3 - 0.08, 0.32, 0.1]}
          radius={0.05}
          smoothness={3}
          position={[-w / 2 + (w / 3) * (i + 0.5), 0.95, -d / 2 + 0.13]}
          material={m.cushionMat}
        />
      ))}
      <RoundedBox args={[w, 0.28, d]} radius={0.04} smoothness={3} position={[0, 0.42, 0]} material={m.woodMat} />
      <RoundedBox args={[w - 0.08, 0.24, d - 0.1]} radius={0.06} smoothness={3} position={[0, 0.66, 0.02]} material={m.cushionMat} />
      {[-1, 1].map((s) => (
        <RoundedBox
          key={s}
          args={[w / 2.6, 0.18, 0.5]}
          radius={0.07}
          smoothness={3}
          position={[s * (w / 4.2), 0.86, -d / 2 + 0.42]}
          material={m.fabricMat}
        />
      ))}
      {[
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ].map(([sx, sz], i) => (
        <mesh key={i} position={[(sx as number) * (w / 2 - 0.1), 0.14, (sz as number) * (d / 2 - 0.12)]} material={m.woodMat}>
          <boxGeometry args={[0.1, 0.28, 0.1]} />
        </mesh>
      ))}
    </group>
  );
});

const Wardrobe = memo(function Wardrobe({ w, m }: { w: number; m: ReturnType<typeof useMaterials> }) {
  const h = 2.2;
  return (
    <group>
      <RoundedBox args={[w, h, 0.6]} radius={0.03} smoothness={3} position={[0, h / 2, 0]} material={m.woodMat} />
      {[-1, 1].map((s) => (
        <RoundedBox
          key={s}
          args={[w / 2 - 0.07, h - 0.14, 0.05]}
          radius={0.02}
          smoothness={3}
          position={[s * (w / 4), h / 2, 0.31]}
          material={m.fabricMat}
        />
      ))}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.06, h / 2, 0.36]} rotation={[Math.PI / 2, 0, 0]} material={m.brassMat}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 10]} />
        </mesh>
      ))}
      <RoundedBox args={[w + 0.08, 0.1, 0.68]} radius={0.02} smoothness={3} position={[0, h + 0.03, 0]} material={m.woodMat} />
    </group>
  );
});

const DiningTable = memo(function DiningTable({ w, m }: { w: number; m: ReturnType<typeof useMaterials> }) {
  const chairs = Math.max(2, Math.round(w / 0.9));
  return (
    <group>
      <RoundedBox args={[w, 0.09, 1.05]} radius={0.03} smoothness={3} position={[0, 0.76, 0]} material={m.woodMat} />
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (w / 2 - 0.22), 0.38, 0]} material={m.woodMat}>
          <boxGeometry args={[0.12, 0.72, 0.7]} />
        </mesh>
      ))}
      {Array.from({ length: chairs }).map((_, i) => {
        const x = -w / 2 + (w / chairs) * (i + 0.5);
        return [-1, 1].map((s) => (
          <group key={`${i}-${s}`} position={[x, 0, s * 0.86]}>
            <RoundedBox args={[0.44, 0.1, 0.44]} radius={0.04} smoothness={3} position={[0, 0.46, 0]} material={m.cushionMat} />
            <RoundedBox
              args={[0.44, 0.55, 0.08]}
              radius={0.04}
              smoothness={3}
              position={[0, 0.74, s * 0.2]}
              material={m.fabricMat}
            />
            {[
              [-1, -1],
              [-1, 1],
              [1, -1],
              [1, 1],
            ].map(([ax, az], k) => (
              <mesh key={k} position={[(ax as number) * 0.17, 0.22, (az as number) * 0.17]} material={m.woodMat}>
                <cylinderGeometry args={[0.025, 0.02, 0.44, 10]} />
              </mesh>
            ))}
          </group>
        ));
      })}
    </group>
  );
});

function Furniture({ piece, fabric, wood, span }: Props) {
  const m = useMaterials(fabric, wood);
  const w = useMemo(() => {
    if (piece === "Sofa") return 1.8 + span * 1.6;
    if (piece === "Bed") return 1.5 + span * 1.1;
    if (piece === "Wardrobe") return 1.2 + span * 1.8;
    return 1.4 + span * 1.6;
  }, [piece, span]);

  if (piece === "Sofa") return <Sofa w={w} m={m} />;
  if (piece === "Bed") return <Bed w={w} m={m} />;
  if (piece === "Wardrobe") return <Wardrobe w={w} m={m} />;
  return <DiningTable w={w} m={m} />;
}

/** Real WebGL studio: orbit with mouse or one finger, pinch to zoom. */
export default function StudioScene(props: Props) {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.6]}
      camera={{ position: [3.6, 2.4, 4.6], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="touch-none"
    >
      <color attach="background" args={["#12201f"]} />
      <fog attach="fog" args={["#12201f", 9, 22]} />
      <hemisphereLight args={["#dfe7e4", "#1b2726", 0.6]} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} />
      <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#c8a151" />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 5, 1]} scale={[8, 8, 1]} />
        <Lightformer intensity={1.2} color="#c8a151" position={[-5, 2, -2]} rotation-y={Math.PI / 2} scale={[12, 2, 1]} />
      </Environment>

      <mesh rotation-x={-Math.PI / 2} position={[0, -0.001, 0]}>
        <circleGeometry args={[9, 48]} />
        <meshStandardMaterial color="#1a2b29" roughness={0.9} />
      </mesh>
      <ContactShadows position={[0, 0.002, 0]} opacity={0.55} scale={12} blur={2.6} far={4} resolution={512} color="#000000" />

      <Furniture {...props} />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.12}
        rotateSpeed={0.8}
        minDistance={3}
        maxDistance={9}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI / 2.12}
        target={[0, 0.7, 0]}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE }}
      />
    </Canvas>
  );
}
