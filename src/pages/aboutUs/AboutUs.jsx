import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 text-black">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-black">About Us</h2>
          <p className="text-lg max-w-3xl mx-auto mt-4 text-black">
            We are a passionate community dedicated to creating lasting change
            through acts of kindness and generosity. Your support is making the
            world a better place. Together, we are empowering lives and building
            a brighter future for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src="	https://nonprofitinformation.com/wp-content/uploads/2015/06/volunteer-training-1536x1024.jpg"
              alt="Our mission"
              className="rounded-lg shadow-xl w-full max-w-md"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-black">
              Our Mission
            </h3>
            <p className="text-lg mb-6 text-black">
              Our mission is to support communities in need, providing essential
              resources, health programs, and educational opportunities. We work
              tirelessly to ensure that every dollar raised goes directly to
              making a real impact.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              Our Impact
            </h3>
            <p className="text-lg mb-6 text-black">
              With your help, we’ve funded countless initiatives that have
              changed lives. From emergency disaster relief to long-term
              community development programs, we continue to push boundaries for
              positive change.
            </p>
            <div className="mt-6">
              <a
                href="#donate"
                className="btn btn-outline btn-success w-full sm:w-auto text-lg font-semibold py-2 px-4 rounded-lg"
              >
                Donate Today and Make an Impact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
