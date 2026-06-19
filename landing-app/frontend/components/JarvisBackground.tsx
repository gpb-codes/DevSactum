"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function JarvisBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const coreGeometry = new THREE.IcosahedronGeometry(2.5, 3);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    const innerCoreGeometry = new THREE.IcosahedronGeometry(1.8, 2);
    const innerCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerCore = new THREE.Mesh(innerCoreGeometry, innerCoreMaterial);
    scene.add(innerCore);

    const glowGeometry = new THREE.SphereGeometry(3.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.08,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    const glow2Geometry = new THREE.SphereGeometry(4.5, 32, 32);
    const glow2Material = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.04,
    });
    const glow2 = new THREE.Mesh(glow2Geometry, glow2Material);
    scene.add(glow2);

    const orbitCount = 6;
    const orbits: {
      group: THREE.Group;
      particles: THREE.Mesh[];
      speed: number;
      radius: number;
      tiltX: number;
      tiltY: number;
    }[] = [];

    const particleGeometry = new THREE.SphereGeometry(0.12, 8, 8);

    for (let i = 0; i < orbitCount; i++) {
      const group = new THREE.Group();
      const radius = 6 + i * 4;
      const particleCount = 8 + i * 4;
      const particles: THREE.Mesh[] = [];
      const speed = 0.15 + Math.random() * 0.2;
      const tiltX = Math.random() * Math.PI;
      const tiltY = Math.random() * Math.PI;

      const orbitCurve = new THREE.EllipseCurve(
        0,
        0,
        radius,
        radius * (0.7 + Math.random() * 0.3),
        0,
        2 * Math.PI,
        false,
        0
      );
      const orbitPoints = orbitCurve.getPoints(128);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
        orbitPoints.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const orbitLineMaterial = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0x7c3aed : 0x06b6d4,
        transparent: true,
        opacity: 0.1,
      });
      const orbitLine = new THREE.Line(orbitGeometry, orbitLineMaterial);
      group.add(orbitLine);

      for (let j = 0; j < particleCount; j++) {
        const color =
          j % 3 === 0
            ? 0x7c3aed
            : j % 3 === 1
            ? 0x06b6d4
            : 0xa855f7;
        const mat = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.7 + Math.random() * 0.3,
        });
        const particle = new THREE.Mesh(particleGeometry, mat);
        const angle = (j / particleCount) * Math.PI * 2;
        particle.position.set(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius * (0.7 + Math.random() * 0.3)
        );
        group.add(particle);
        particles.push(particle);
      }

      group.rotation.x = tiltX;
      group.rotation.y = tiltY;
      scene.add(group);
      orbits.push({ group, particles, speed, radius, tiltX, tiltY });
    }

    const nodeCount = 120;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);
    const nodeSpeeds: number[] = [];
    const purple = new THREE.Color(0x7c3aed);
    const cyan = new THREE.Color(0x06b6d4);

    for (let i = 0; i < nodeCount; i++) {
      const r = 8 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      nodePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      nodePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      nodePositions[i * 3 + 2] = r * Math.cos(phi);

      const c = Math.random() > 0.5 ? purple : cyan;
      nodeColors[i * 3] = c.r;
      nodeColors[i * 3 + 1] = c.g;
      nodeColors[i * 3 + 2] = c.b;

      nodeSpeeds.push(0.002 + Math.random() * 0.005);
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nodePositions, 3)
    );
    nodeGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(nodeColors, 3)
    );
    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodes);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.06,
    });

    const linePool: THREE.Line[] = [];
    const maxLines = 40;
    for (let i = 0; i < maxLines; i++) {
      const lineGeom = new THREE.BufferGeometry();
      const positions = new Float32Array(6);
      lineGeom.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      const line = new THREE.Line(lineGeom, lineMaterial.clone());
      line.visible = false;
      scene.add(line);
      linePool.push(line);
    }

    const ringGeometry = new THREE.RingGeometry(15, 15.08, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const ring2Geometry = new THREE.RingGeometry(22, 22.06, 64);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = Math.PI / 2.5;
    ring2.rotation.y = 0.3;
    scene.add(ring2);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      core.rotation.y = elapsed * 0.1;
      core.rotation.x = elapsed * 0.05;
      innerCore.rotation.y = -elapsed * 0.15;
      innerCore.rotation.z = elapsed * 0.08;

      const coreScale = 1 + Math.sin(elapsed * 2) * 0.05;
      core.scale.setScalar(coreScale);
      innerCore.scale.setScalar(1.1 - Math.sin(elapsed * 2) * 0.05);

      glow.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.08);
      glow2.scale.setScalar(1 + Math.cos(elapsed * 1.2) * 0.06);

      ring.rotation.z = elapsed * 0.03;
      ring2.rotation.z = -elapsed * 0.02;

      orbits.forEach((orbit, i) => {
        orbit.group.rotation.y += orbit.speed * 0.01;
        orbit.particles.forEach((particle, j) => {
          const t = elapsed * orbit.speed + (j / orbit.particles.length) * Math.PI * 2;
          const r = orbit.radius;
          const wobble = Math.sin(t * 3 + j) * 0.3;
          particle.position.y = wobble;
          const scale = 0.8 + Math.sin(t * 2 + j) * 0.4;
          particle.scale.setScalar(Math.max(scale, 0.3));
        });
      });

      const posAttr = nodeGeometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < nodeCount; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const z = posAttr.getZ(i);
        const dist = Math.sqrt(x * x + y * y + z * z);
        const speed = nodeSpeeds[i];
        const angle = Math.atan2(z, x) + speed;
        const newR = dist;
        posAttr.setXYZ(
          i,
          Math.cos(angle) * newR * (1 + Math.sin(elapsed + i) * 0.01),
          y + Math.sin(elapsed * 0.5 + i) * 0.005,
          Math.sin(angle) * newR * (1 + Math.cos(elapsed + i) * 0.01)
        );
      }
      posAttr.needsUpdate = true;

      let lineIdx = 0;
      for (let i = 0; i < nodeCount && lineIdx < maxLines; i++) {
        const ax = posAttr.getX(i);
        const ay = posAttr.getY(i);
        const az = posAttr.getZ(i);
        for (let j = i + 1; j < nodeCount && lineIdx < maxLines; j++) {
          const bx = posAttr.getX(j);
          const by = posAttr.getY(j);
          const bz = posAttr.getZ(j);
          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 6) {
            const line = linePool[lineIdx];
            const linePos = line.geometry.getAttribute(
              "position"
            ) as THREE.BufferAttribute;
            linePos.setXYZ(0, ax, ay, az);
            linePos.setXYZ(1, bx, by, bz);
            linePos.needsUpdate = true;
            (line.material as THREE.LineBasicMaterial).opacity =
              0.06 * (1 - dist / 6);
            line.visible = true;
            lineIdx++;
          }
        }
      }
      for (let i = lineIdx; i < maxLines; i++) {
        linePool[i].visible = false;
      }

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
