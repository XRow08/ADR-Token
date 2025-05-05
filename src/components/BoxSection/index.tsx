import { useState, useRef, useEffect, useCallback } from "react";

export function BoxSection() {
  const [spinning, setSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState(0);

  const items = Array(10)
    .fill(0)
    .map((_, i) => ({
      id: i + 1,
      label: `Prêmio ${i + 1}`,
      color: i % 2 === 0 ? "#333333" : "#222222",
    }));
  const displayItems = Array(100)
    .fill(0)
    .map((_, i) => items[i % items.length]);
  const itemWidth = 160;
  const itemGap = 40;
  const totalItemWidth = itemWidth + itemGap;

  // Função para centralizar a roleta no meio das opções
  const centerRoleta = useCallback(() => {
    if (!containerRef.current || !outerContainerRef.current) return;
    
    const containerWidth = outerContainerRef.current.clientWidth;
    const visibleItemsCount = Math.ceil(containerWidth / totalItemWidth) + 2;
    const middleIndex = Math.floor(displayItems.length / 2);
    const startIndex = Math.max(
      0,
      middleIndex - Math.floor(visibleItemsCount / 2)
    );
    const position = startIndex * totalItemWidth;
    setInitialPosition(position);
    
    // Aplicar posição sem animação
    containerRef.current.style.transition = "none";
    containerRef.current.style.transform = `translateX(-${position}px)`;
    void containerRef.current.offsetWidth; // Forçar reflow
  }, [displayItems.length, totalItemWidth]);

  // Inicializar e responder a redimensionamentos
  useEffect(() => {
    centerRoleta();
    window.addEventListener("resize", centerRoleta);
    return () => window.removeEventListener("resize", centerRoleta);
  }, [centerRoleta]);

  // Função para centralizar em um item específico
  const centerOnItem = (itemIndex: number) => {
    if (!containerRef.current) return;
    
    // Voltar para a posição inicial (meio do array)
    centerRoleta();
    
    // Aguardar um momento para garantir que a posição inicial foi aplicada
    setTimeout(() => {
      if (!containerRef.current) return;
      
      // Calcular a nova posição para mostrar o item no centro
      const targetPosition = initialPosition + (itemIndex * totalItemWidth);
      
      // Aplicar uma transição suave para o item
      containerRef.current.style.transition = "transform 0.5s ease-out";
      containerRef.current.style.transform = `translateX(-${targetPosition}px)`;
    }, 50);
  };

  const handleSpin = () => {
    if (spinning || !containerRef.current) return;

    setShowResult(false);
    setSpinning(true);
    const rotations = 2 + Math.floor(Math.random() * 3);
    const randomIndex = Math.floor(Math.random() * items.length);
    setSelectedIndex(randomIndex);

    try {
      // Começar do centro para cada novo giro
      const currentX = initialPosition;
      
      // Calcular o destino final
      const pixelsToSpin = (rotations * items.length + randomIndex) * totalItemWidth;
      const newPosition = currentX + pixelsToSpin;
      
      // Animar para o destino
      containerRef.current.style.transition =
        "transform 4s cubic-bezier(0.1, 0.7, 0.1, 1)";
      containerRef.current.style.transform = `translateX(-${newPosition}px)`;
      
      // Após terminar a animação
      setTimeout(() => {
        if (!containerRef.current) return;

        // Voltar a posição inicial
        centerRoleta();
        setSpinning(false);
        setShowResult(true);
      }, 4000);
    } catch (e) {
      console.error("Erro ao girar a roleta:", e);
      setSpinning(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="bg-[#0F0F0F] flex flex-col items-center justify-center border-y border-[#222222] w-full h-[320px] relative overflow-hidden md:mt-[64px] mt-[56px] py-10">
        <div className="bg-[#6E6E6E]/50 w-[40rem] h-[40rem] absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[140px] z-0" />

        <div
          ref={outerContainerRef}
          className="relative w-full h-full overflow-hidden z-10"
        >
          <div className="h-full w-full flex items-center justify-center">
            <div
              ref={containerRef}
              className="flex will-change-transform gap-10"
              style={{ minWidth: `${displayItems.length * totalItemWidth}px` }}
            >
              {displayItems.map((item, index) => (
                <div
                  key={index}
                  className={`bg-[url('/images/camisa.png')] bg-contain bg-center bg-no-repeat h-[10rem] w-[10rem] flex-shrink-0 ${
                    index % items.length === selectedIndex && !spinning
                      ? "ring-2 ring-yellow-500"
                      : ""
                  }`}
                  data-index={index}
                  data-item-id={item.id}
                />
              ))}
            </div>
          </div>
          
          {/* Indicador central */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-[100px] bg-yellow-500 opacity-50 pointer-events-none"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 text-xs text-white opacity-50 p-1 z-20">
          {spinning
            ? "Girando..."
            : selectedIndex !== null
            ? `Item: ${selectedIndex + 1}`
            : ""}
        </div>
      </div>
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="bg-[#007BFF] text-white px-4 py-2 rounded-md"
      >
        {spinning ? "Girando..." : "Girar"}
      </button>
    </section>
  );
}
