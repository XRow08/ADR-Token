import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { LogoIcon } from "@/components/Icons/LogoIcon";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { StaggeredContainer } from "@/components/StaggeredContainer";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#0F0F0F]">
      <Header />
      <div className="w-full min-h-screen flex flex-col items-center justify-start pt-[144px] bg-[url('/images/home_bg.webp')] max-w-[1440px] bg-cover bg-center">
        <ScrollAnimation
          type="fade"
          direction="down"
          duration={0.8}
          delay={0.2}
        >
          <h1 className="text-[#EEE] text-[36px] xl:text-[56px] w-full text-center leading-[61.6px]">
            The only official <br />{" "}
            <span className="bg-gradient-to-r from-[#FFF7A8] to-[#FFEB28] bg-clip-text text-transparent">
              Adriano Imperador
            </span>{" "}
            token
          </h1>
        </ScrollAnimation>

        <ScrollAnimation type="fade" direction="up" duration={0.7} delay={0.5}>
          <p className="xl:text-lg xl:leading-[23.4px] text-center text-[#B4B4B4]">
            Own a piece of Adriano Imperador legacy. Be a part of the $ADR
            movement—where <br /> holders play, win, and unlock exclusive
            rewards.
          </p>
        </ScrollAnimation>

        <ScrollAnimation type="scale" duration={0.6} delay={0.8}>
          <Button className="mt-[40px]">Buy token $ADR</Button>
        </ScrollAnimation>
      </div>

      <div className="w-full min-h-screen flex flex-col max-w-[1280px] pt-[144px]">
        <div className="flex items-center justify-between">
          <ScrollAnimation
            type="slide"
            direction="right"
            duration={0.75}
            delay={0.1}
            className="w-full flex flex-col items-start justify-start"
          >
            <h1 className="text-[#EEE] text-[24px] xl:text-[36px] w-full leading-[61.6px]">
              Adriano Token da Vila Cruzeiro para o Mundo
            </h1>
            <p className="xl:text-lg xl:leading-[23.4px] text-[#B4B4B4]">
              Ídolo do futebol mundial e orgulho do Brasil, Adriano Imperador
              apresenta seu token oficial: um projeto que celebra sua <br />{" "}
              trajetória e impulsiona ações sociais para transformar a
              comunidade onde tudo começou.
            </p>
          </ScrollAnimation>
          <ScrollAnimation
            type="rotate"
            duration={0.8}
            delay={0.3}
            className="flex items-center justify-center bg-[#222] border border-[#3A3A3A] w-[52px] h-[52px] px-2 rounded-sm overflow-hidden"
          >
            <LogoIcon />
          </ScrollAnimation>
        </div>

        <StaggeredContainer
          className="flex flex-col mt-8"
          delay={0.2}
          staggerDelay={0.15}
          type="slide"
          direction="up"
        >
          <div className="flex items-center justify-between h-[317px] gap-3">
            <ScrollAnimation
              type="fade"
              direction="left"
              duration={0.7}
              delay={0.1}
              className="flex flex-col justify-end items-end bg-[url('/images/card.png')] bg-cover bg-center lg:min-w-[733px] w-[733px] h-full p-4 rounded-xl transition-all duration-300"
            >
              <div className="p-4 rounded-lg w-full">
                <h1 className="text-[#EEE] text-[24px] xl:text-[28px] w-full leading-[61.6px]">
                  Mais que um Token: Um Movimento
                </h1>
                <p className="xl:text-lg xl:leading-[23.4px] text-[#B4B4B4]">
                  O Adriano Token nasce do desejo genuíno de devolver à
                  comunidade aquilo que o futebol proporcionou a Adriano.
                  Utilizando a tecnologia blockchain, o projeto conecta inovação
                  a impacto real, gerando oportunidades e novos caminhos para
                  jovens da Vila Cruzeiro
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation
              type="slide"
              direction="right"
              duration={0.7}
              delay={0.2}
              className="flex flex-col justify-end items-end bg-[url('/images/card2.webp')] bg-cover bg-center w-full h-full p-4 rounded-xl transition-all duration-300"
            >
              <div className="p-4 rounded-lg w-full">
                <h1 className="text-[#EEE] text-[24px] xl:text-[28px] w-full leading-[61.6px]">
                  Transformação na Vila Cruzeiro
                </h1>
                <p className="xl:text-lg xl:leading-[23.4px] text-[#B4B4B4]">
                  Parte dos recursos gerados com o Adriano Token será destinada
                  a projetos sociais: educação, esportes, cultura e
                  empreendedorismo local
                </p>
              </div>
            </ScrollAnimation>
          </div>

          <div className="flex items-center justify-between h-[317px] gap-3 mt-3">
            <ScrollAnimation
              type="slide"
              direction="left"
              duration={0.7}
              delay={0.25}
              className="flex flex-col justify-end items-end bg-[url('/images/card3.webp')] bg-cover bg-center lg:min-w-[843px] w-[843px] h-full p-4 rounded-xl transition-all duration-300"
            >
              <div className="p-4 rounded-lg w-full">
                <h1 className="text-[#EEE] text-[24px] xl:text-[28px] w-full leading-[61.6px]">
                  Raízes fortes, sonhos grandes
                </h1>
                <p className="xl:text-lg xl:leading-[23.4px] text-[#B4B4B4]">
                  Diferente de iniciativas desconectadas, o Adriano Token é
                  construído em torno de uma relação verdadeira e viva com a
                  Vila Cruzeiro. Não se trata apenas de homenagear a história
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation
              type="scale"
              duration={0.6}
              delay={0.35}
              className="flex flex-col justify-center items-center bg-[url('/images/card4.webp')] bg-cover bg-center w-full h-full p-4 rounded-xl transition-all duration-300"
            >
              <ScrollAnimation type="scale" duration={0.5} delay={0.7}>
                <Button className="w-[288px] h-[56px]">Buy token $ADR</Button>
              </ScrollAnimation>
            </ScrollAnimation>
          </div>
        </StaggeredContainer>
      </div>

      <div className="w-full min-h-screen flex flex-col items-center justify-start pt-[144px]">
        <div className="flex flex-col items-center justify-center max-w-[1062px]">
          <ScrollAnimation
            type="slide"
            direction="down"
            duration={0.7}
            delay={0.1}
          >
            <h1 className="text-[#EEE] text-[30px] xl:text-[36px] w-full font-bold text-center leading-[61.6px]">
              Blockchain e Impacto Social
            </h1>
          </ScrollAnimation>

          <ScrollAnimation
            type="fade"
            direction="up"
            duration={0.7}
            delay={0.3}
          >
            <p className="xl:leading-[23.4px] text-center text-[#B4B4B4]">
              O avanço da tecnologia blockchain e das criptomoedas vai além das
              finanças, abrindo espaço para iniciativas de impacto social.
              Tokens como o Adriano Token combinam potencial financeiro e
              transformação social, criando projetos onde o sucesso econômico
              impulsiona benefícios reais para comunidades.
            </p>
          </ScrollAnimation>
        </div>

        <ScrollAnimation
          type="scale"
          duration={0.8}
          delay={0.4}
          className="mt-8 w-full max-w-[1280px]"
        >
          <div className="relative w-full h-[368px] rounded-xl overflow-hidden">
            <Image 
              src="/images/bg-section3.png" 
              alt="Blockchain e Impacto Social" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation 
          type="slide" 
          direction="up" 
          duration={0.6} 
          delay={0.6}
        >
          <p className="xl:leading-[23.4px] text-center text-[#B4B4B4] max-w-[1062px] mt-4">
            As vantagens desse modelo incluem transparência, eliminação de
            intermediários, alcance global, engajamento comunitário e
            sustentabilidade financeira
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
}
