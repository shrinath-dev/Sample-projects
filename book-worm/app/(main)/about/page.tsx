import Image from "next/image";
import { Heart, Users, Target, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto px-4 md:px-20 py-20 h-100 md:h-125">
        <div className="flex flex-col gap-8 items-center text-center">
          <h2 className="text-3xl sm:text-6xl font-bold">
            Our Mission: Reigniting the Love for Reading
          </h2>
          <p className="text-md sm:text-xl text-muted-foreground">
            In a world of endless distractions, we're here to help you
            rediscover the transformative power of books.
          </p>
        </div>
      </section>

      <section className="mx-auto px-4 md:px-20 py-20 bg-popover">
        <div className="grid md:grid-cols-2 gap-8 justify-center items-center">
          <div>
            <h2 className="text-2xl sm:text-4xl mb-4 font-semibold ">
              Our Story
            </h2>
            <div className="flex flex-col gap-3 text-muted-foreground text-lg">
              <p>
                BookRead was born from a simple observation: despite having
                access to millions of books, many people struggle to maintain a
                consistent reading habit. We asked ourselves, "Why?"
              </p>
              <p>
                The answer was clear. Reading had become fragmented scattered
                wishlists, forgotten recommendations, and no easy way to track
                progress or celebrate achievements. We knew there had to be a
                better way.
              </p>
              <p>
                In 2024, we set out to create more than just another book
                tracking app. We envisioned a platform that would reignite the
                joy of reading, build meaningful connections between readers,
                and make every book journey memorable.
              </p>
              <p>
                Today, BookRead serves over 100,000 passionate readers
                worldwide, helping them discover, track, and celebrate their
                love for books.
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden h-100 sm:h-140">
            <Image
              src="/about-hero-image.jpeg"
              alt="hero image"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 md:px-20 py-20 ">
        <div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-center mb-8">
            Our Vision
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-6">
            We envision a world where reading is not just a pastime, but a
            celebrated journey of continuous growth and discovery. A world where
            every reader feels supported, inspired, and connected.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-card border border-border rounded-2xl">
              <Heart className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Passion For Reading
              </h3>
              <p className="text-muted-foreground">
                We believe reading is more than a hobby, it's a journey of
                self-discovery, growth, and endless possibilities.
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-2xl">
              <Users className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Community First
              </h3>
              <p className="text-muted-foreground">
                Building connections between readers worldwide, creating a
                supportive space where book lovers can share and grow together.
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-2xl">
              <Target className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Personal Growth
              </h3>
              <p className="text-muted-foreground">
                Empowering readers to set goals, track progress, and celebrate
                every page turned on their reading journey.
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-2xl">
              <Sparkles className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Joy Of Discovery
              </h3>
              <p className="text-muted-foreground">
                Making it easier to discover your next favorite book and
                rediscover the magic of reading.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 md:px-20 py-20 bg-popover">
        <div>
          <h2 className="text-2xl sm:text-4xl mb-8 text-center font-bold ">
            What We Believe
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="max-w-125">
              <h3 className="text-xl sm:text-2xl text-primary font-semibold mb-3">
                Reading Changes Lives
              </h3>
              <p className="text-md sm:text-lg text-muted-foreground">
                Every book has the power to teach, inspire, and transform. We're
                committed to helping readers unlock this potential, one page at
                a time.
              </p>
            </div>

            <div className="max-w-125">
              <h3 className="text-xl sm:text-2xl text-primary font-semibold mb-3">
                Community Matters
              </h3>
              <p className="text-md sm:text-lg text-muted-foreground">
                Reading doesn't have to be solitary. The best book
                recommendations come from fellow readers who share your passions
                and interests.
              </p>
            </div>

            <div className="max-w-125">
              <h3 className="text-xl sm:text-2xl text-primary font-semibold mb-3">
                Progress Should Be Celebrated
              </h3>
              <p className="text-md sm:text-lg text-muted-foreground">
                Whether it's finishing your first book of the year or reaching a
                milestone of 100 books, every achievement deserves recognition.
              </p>
            </div>

            <div className="max-w-125">
              <h3 className="text-xl sm:text-2xl text-primary font-semibold mb-3">
                Simplicity Is Key
              </h3>
              <p className="text-md sm:text-lg text-muted-foreground">
                Reading should be effortless. Our tools are designed to enhance
                your reading experience, not complicate it.
              </p>
            </div>

            <div className="max-w-125">
              <h3 className="text-xl sm:text-2xl text-primary font-semibold mb-3">
                Diversity Enriches
              </h3>
              <p className="text-md sm:text-lg text-muted-foreground">
                We champion diverse voices and stories from all cultures,
                backgrounds, and perspectives. Great books come from everywhere.
              </p>
            </div>

            <div className="max-w-125">
              <h3 className="text-xl sm:text-2xl text-primary font-semibold mb-3">
                Accessibility For All
              </h3>
              <p className="text-md sm:text-lg text-muted-foreground">
                Everyone deserves access to the joy of reading. We're dedicated
                to making our platform inclusive and accessible to all readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 md:px-20 py-20 bg-primary">
        <h2 className="text-2xl sm:text-4xl text-primary-foreground font-bold text-center">
          Join Us On This Journey
        </h2>
        <p className="text-md sm:text-lg text-muted/80 text-center mb-6">
          Whether you're a casual reader or a book enthusiast, there's a place
          for you in our community. Let's make reading better, together.
        </p>

        <Link className="text-center flex justify-center" href="/login">
          <button className="text-md font-semibold bg-secondary px-4  py-2 rounded-lg cursor-pointer hover:bg-secondary/80 transition-all">
            Start Your Journey
          </button>
        </Link>
      </section>
    </>
  );
}
