"use client";
import { StaggeredContainer } from "@/components/StaggeredContainer";
import { Card1, Card2, Card3, Card4 } from "@/components/Cards";

export const FeaturesGrid = () => {
  return (
    <StaggeredContainer
      className="flex flex-col mt-8 w-full px-6 sm:px-8 lg:px-0 max-w-[1440px] mx-auto"
      delay={0.2}
      staggerDelay={0.15}
      type="slide"
      direction="up"
    >
      {/* Layout desktop (md e acima) */}
      <div className="hidden md:flex items-center justify-between h-[317px] w-full gap-3">
        <Card1
          title="Mais que um Token: Um Movimento"
          description="O Adriano Token nasce do desejo genuíno de devolver à comunidade aquilo que o futebol proporcionou a Adriano. Utilizando a tecnologia blockchain, o projeto conecta inovação a impacto real, gerando oportunidades e novos caminhos para jovens da Vila Cruzeiro"
          width="lg:min-w-[733px] w-[733px]"
        />

        <Card2
          title="Transformação na Vila Cruzeiro"
          description="Parte dos recursos gerados com o Adriano Token será destinada a projetos sociais: educação, esportes, cultura e empreendedorismo local"
          width="w-full"
        />
      </div>

      <div className="hidden md:flex items-center justify-between h-[317px] w-full gap-3 mt-3">
        <Card3
          title="Raízes fortes, sonhos grandes"
          description="Diferente de iniciativas desconectadas, o Adriano Token é construído em torno de uma relação verdadeira e viva com a Vila Cruzeiro. Não se trata apenas de homenagear a história"
          width="lg:min-w-[843px] w-[843px]"
        />

        <Card4 
          buttonText="Buy token $ADR"
          width="w-full"
        />
      </div>

      {/* Layout mobile (abaixo de md) */}
      <div className="flex flex-col md:hidden w-full gap-6">
        <div className="h-[280px] w-full">
          <Card1
            title="Mais que um Token: Um Movimento"
            description="O Adriano Token nasce do desejo genuíno de devolver à comunidade aquilo que o futebol proporcionou a Adriano. Utilizando a tecnologia blockchain, o projeto conecta inovação a impacto real, gerando oportunidades e novos caminhos para jovens da Vila Cruzeiro"
            width="w-full"
          />
        </div>
        
        <div className="h-[280px] w-full">
          <Card2
            title="Transformação na Vila Cruzeiro"
            description="Parte dos recursos gerados com o Adriano Token será destinada a projetos sociais: educação, esportes, cultura e empreendedorismo local"
            width="w-full"
          />
        </div>
        
        <div className="h-[280px] w-full">
          <Card3
            title="Raízes fortes, sonhos grandes"
            description="Diferente de iniciativas desconectadas, o Adriano Token é construído em torno de uma relação verdadeira e viva com a Vila Cruzeiro. Não se trata apenas de homenagear a história"
            width="w-full"
          />
        </div>
        
        <div className="h-[140px] w-full">
          <Card4 
            buttonText="Buy token $ADR"
            width="w-full"
          />
        </div>
      </div>
    </StaggeredContainer>
  );
};
