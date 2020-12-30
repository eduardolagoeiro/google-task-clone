import React from 'react';
import { StyleSheet } from 'react-native';
import ExplosionParticle from '../../task/components/ExplosionParticle';

export default function ExplosionEffect(props: {
  explosionTime: number;
  children: JSX.Element;
  explosionRadius: number;
  innerRadius: number;
}) {
  const explosionTime = props.explosionTime;
  const radius = props.innerRadius / 2;
  const explosionRadius = props.explosionRadius;
  const cos30 = Math.cos((30 * Math.PI) / 180);
  const cos60 = Math.cos((60 * Math.PI) / 180);
  return (
    <>
      <ExplosionParticle
        style={[styles.particle, { top: 0 }]}
        translateYFrom={0}
        translateYTo={-explosionRadius}
        explosionTime={explosionTime}
        particleColor="blue"
      />
      <ExplosionParticle
        style={[
          styles.particle,
          {
            top: radius - cos60 * radius,
            right: radius - cos30 * radius,
          },
        ]}
        translateYFrom={0}
        translateYTo={-cos60 * explosionRadius}
        translateXFrom={0}
        translateXTo={cos30 * explosionRadius}
        explosionTime={explosionTime}
        particleColor="red"
      />
      <ExplosionParticle
        style={[
          styles.particle,
          {
            bottom: radius - cos60 * radius,
            right: radius - cos30 * radius,
          },
        ]}
        translateYFrom={0}
        translateYTo={cos60 * explosionRadius}
        translateXFrom={0}
        translateXTo={cos30 * explosionRadius}
        explosionTime={explosionTime}
        particleColor="orange"
      />
      <ExplosionParticle
        style={[styles.particle, { bottom: 0 }]}
        translateYFrom={0}
        translateYTo={explosionRadius}
        explosionTime={explosionTime}
        particleColor="green"
      />
      <ExplosionParticle
        style={[
          styles.particle,
          {
            bottom: radius - cos60 * radius,
            left: radius - cos30 * radius,
          },
        ]}
        translateYFrom={0}
        translateYTo={cos60 * explosionRadius}
        translateXFrom={0}
        translateXTo={-cos30 * explosionRadius}
        explosionTime={explosionTime}
        particleColor="red"
      />
      <ExplosionParticle
        style={[
          styles.particle,
          {
            top: radius - cos60 * radius,
            left: radius - cos30 * radius,
          },
        ]}
        translateYFrom={0}
        translateYTo={-cos60 * explosionRadius}
        translateXFrom={0}
        translateXTo={-cos30 * explosionRadius}
        explosionTime={explosionTime}
        particleColor="yellow"
      />
      {props.children}
    </>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
  },
});
