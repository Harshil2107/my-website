import React from "react";
import { Row, Col } from "react-bootstrap";
import Experience from "@/components/experience";
import Containter from "react-bootstrap/Container";
import Hello from "@/components/hello";
import researchExperience from "/public/jsons/research-experience.json";
import workExperience from "/public/jsons/work-experience.json";
import projects from "/public/jsons/projects.json";
import awards from "/public/jsons/awards.json";
import Image from "next/image";
import Publication from "@/components/publication";
import Education from "@/components/education";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const headings = document.querySelectorAll(".content h1");
    headings.forEach((heading) => {
      gsap.from(heading, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: { amount: 1 },
        ease: "ease",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
        },
      });
    });
  }, []);

  return (
    <Containter className="home">
      <div
        style={{
          position: "absolute",
          left: "0",
          width: "100%",
          height: "50vh",
          zIndex: "-1",
          background: `url("${process.env.CONFIG.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <Row style={{ zIndex: "1", position: "relative", height: "50vh" }}>
        <Hello />
      </Row>
      <div className="content">
        <Row>
          <Education />
        </Row>
        {/* <Row>
          <Experience
            jsonExperiences={researchExperience}
            title={"Research Experience"}
            isExperience
          />
        </Row> */}
        <Row>
          <Experience
            jsonExperiences={workExperience}
            title={"Work Experience"}
            isExperience
          />
        </Row>
        <Row>
          <Experience jsonExperiences={projects} title={"Projects"} />
        </Row>
        <Row>
          <div className="mt-5">
            <h1 className="mb-3" id="publications">
              Publications
            </h1>
            <Publication />
          </div>
        </Row>
        <Row>
          <div className="mt-5">
            <h1 className="mb-3" id="awards">
              Awards
            </h1>
            {awards.map((award, index) => {
              return <Award key={index} award={award} />;
            })}
          </div>
        </Row>
      </div>
    </Containter>
  );
}

function Award({ award }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: "ease",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <Row className="mb-3" ref={ref}>
      <Col
        xs={1}
        className="d-flex align-items-center"
        style={{ width: "auto" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          class="bi bi-trophy-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
        </svg>
      </Col>
      <Col>
        <div>
          <h3>{award.awarder}</h3>
          <p>
            {award.link ? (
              <Link href={award.link}>{award.awarder}</Link>
            ) : (
              award.title
            )}
          </p>
          <span>{award.date}</span>
        </div>
      </Col>
    </Row>
  );
}
