export function updateIcicleBullets(deltaTime) {
  if (!window.icicleBullets) {
    window.icicleBullets = [];
    return;
  }

  window.icicleBullets = window.icicleBullets.filter(icicle => {
    if (!icicle || !icicle.mesh) return false;

    icicle.mesh.position.add(icicle.velocity.clone().multiplyScalar(deltaTime));

    // Kontrola kolize s hráčem
    if (icicle.mesh.position.distanceTo(player.position) < 0.5) {
      playerTakeDamage(icicle.damage);
      scene.remove(icicle.mesh);
      icicle.mesh.geometry.dispose();
      icicle.mesh.material.dispose();
      return false;
    }

    // Kontrola životnosti icicle
    if (Date.now() - icicle.startTime > icicle.duration) {
      scene.remove(icicle.mesh);
      icicle.mesh.geometry.dispose();
      icicle.mesh.material.dispose();
      return false;
    }

    return true;
  });
}