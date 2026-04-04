"use client";

import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import "./home.css";

export default function Home() {
  return (
    <div className="homeMain">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Develop your <span>skills</span> in a new <span>unique way</span>
          </h1>
          <p>
            Learn from top instructors and upgrade your career with modern
            online courses.
          </p>

          <div className="hero-btns">
            <button className="primary">Get Started</button>
            <button className="secondary">Watch Demo</button>
          </div>
        </div>

        <div className="hero-right">
          <Image
            src="/images/hero.png"
            alt="hero"
            width={400}
            height={400}
          />
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="search">
        <input placeholder="Search over 100+ courses..." />
        <button>Search</button>
      </section>

      {/* COURSES */}
      <section className="courses">
        <h2>Our Popular Courses</h2>

        <div className="course-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="course-card">
              <Image
                src="/images/course.png"
                alt="course"
                width={250}
                height={150}
              />
              <h3>Web Design & Development</h3>
              <p>4.8 ⭐ | 1200 students</p>
              <span>$49.00</span>
            </div>
          ))}
        </div>
      </section>

      {/* TEACHER CTA */}
      <section className="teacher">
        <div>
          <h2>If You Are A Certified Teacher</h2>
          <p>Join us and start teaching students worldwide</p>
          <button className="primary">Become Instructor</button>
        </div>

        <Image
          src="/images/teacher.png"
          alt="teacher"
          width={300}
          height={300}
        />
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>Students Testimonials</h2>

        <div className="testimonial-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="testimonial-card">
              <p>
                “Amazing platform! I learned so much and improved my skills.”
              </p>
              <span>- Student Name</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}