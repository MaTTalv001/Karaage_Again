function FlyingKaraage() {
  // 唐揚げの位置をランダムに設定
  const top = Math.random() * 100;
  const left = Math.random() * 100;

  return (
    <img
      src="/favicon.png"
      alt="唐揚げ"
      style={{
        position: "fixed",
        top: `${top}vh`,
        left: `${left}vw`,
        animation: "fly 2s linear infinite",
        width: "50px",
      }}
    />
  );
}
export default FlyingKaraage;
