import { useI18n } from "../i18n/context";import Fade from "../components/Fade";
import SectionHeader from "../components/SectionHeader";
import { FaGithub, FaEnvelope, FaGraduationCap } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function About({ t }) {const { tr } = useI18n();
  return (
    <div
      style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "8rem 2rem 10rem",
        textAlign: "left",
        overflow: "visible"
      }}>

      <Fade>
        <SectionHeader eyebrow={tr("Background")} title={tr("About")} t={t} />
      </Fade>

      <Fade>
        <div className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
          gap: "4rem",
          alignItems: "start"
        }}>

          {/* Coluna esquerda: foto + links */}
          <div>
            <img
              src={`${import.meta.env.BASE_URL}Davi.jpeg`}
              alt={tr("Davi Santos-Silva")}
              style={{
                width: "100%",
                aspectRatio: "0.8",
                objectFit: "cover",
                borderRadius: "2px",
                border: `1px solid ${t.borderHover}`,
                filter: "grayscale(20%) contrast(1.05)"
              }} />


            <a className="text-link about-cv" href={`${import.meta.env.BASE_URL}cv-pt.pdf`} download="Davi-Santos-Silva-CV-PT.pdf">{tr('Download CV · PDF in Portuguese')} ↓</a>
            {/* Links sociais com ícones */}
            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem"
              }}>

              {tr([
              {
                label: "Lattes",
                url: "http://lattes.cnpq.br/4597220987852921",
                icon: <FaGraduationCap size={15} />
              },
              {
                label: "GitHub",
                url: "https://github.com/davisilva169",
                icon: <FaGithub size={15} />
              },
              {
                label: "Email",
                url: "mailto:davisilva169@usp.br",
                icon: <FaEnvelope size={14} />
              }].
              map((link) =>
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: t.accent,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = t.accentSolid}
                onMouseLeave={(e) => e.currentTarget.style.color = t.accent}>

                  <span
                  style={{
                    width: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "inherit"
                  }}>

                    {tr(link.icon)}
                  </span>
                  {tr(link.label)}
                </a>
              ))}
            </div>
          </div>

          {/* Coluna direita: bio + skills */}
          <div>
            <p
              style={{
                fontFamily: "Georgia, Cambria, serif",
                fontSize: "1.4rem",
                fontStyle: "italic",
                lineHeight: 1.65,
                color: t.textDim,
                marginBottom: "1.8rem",
                fontWeight: 400
              }}>{tr("Physics student and researcher at the intersection of statistical physics, stochastic processes, and mathematical modeling.")}



            </p>

            {tr([
            "I'm an undergraduate student in Physics at the University of São Paulo (USP), with a focus on Applied Statistical Physics and computational methods. I work with numerical simulations, data analysis, mathematical methods and scientific visualization in Python, often exploring ways to make complex physical ideas more intuitive and visually accessible.",
            "Currently, my work is oriented towards astrophysics and complex systems, but I have an interest in dynamical systems, statistical methods, and nonlinear phenomena. I approach these problems with a combination of analytical methods and numerical simulation.",
            "Beyond research, I am interested in the interplay between rigor and intuition — how deep ideas can be expressed with clarity, simplicity, and elegance. I enjoy writing, visual design, and quiet disciplines such as chess, traveling, reading and cooking."].
            map((para, i) =>
            <p
              key={i}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.82,
                color: t.textMuted,
                marginBottom: "1.2rem"
              }}>

                {tr(para)}
              </p>
            ))}

            {/* Skills */}
            <div
              style={{
                marginTop: "2rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem"
              }}>

              {tr([
              "Statistical Physics",
              "Python · NumPy · SciPy",
              "Stochastic Processes",
              "Monte Carlo Methods",
              "Quantum Mechanics",
              "Numerical Simulation",
              "Complex Systems",
              "Nonlinear Dynamical Systems"].
              map((skill) =>
              <div
                key={skill}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.63rem",
                  letterSpacing: "0.08em",
                  color: t.accent,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>

                  <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: t.accentSolid,
                    flexShrink: 0
                  }} />

                  {tr(skill)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </div>);

}
