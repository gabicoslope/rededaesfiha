import logoUrl from "@/assets/logo-rede-da-esfiha.png";

// Tela de abertura: o logo sai de uma fumacinha dourada (como o gênio saindo da
// lâmpada) e a tela vermelha sobe, revelando o site. É só CSS, então some sozinha
// mesmo se o JavaScript falhar, e dura pouco mais de 1 segundo.
// Com "reduzir movimento" ligado, ela some quase na hora.
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-stage">
        <span className="preloader-smoke preloader-smoke-1" />
        <span className="preloader-smoke preloader-smoke-2" />
        <span className="preloader-smoke preloader-smoke-3" />
        <img src={logoUrl} alt="" width={420} height={399} className="preloader-logo" />
      </div>
    </div>
  );
}
