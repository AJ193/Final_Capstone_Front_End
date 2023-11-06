import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Diverse Fleet',
    description:
      'Choose from a wide range of vehicles, from fuel-efficient compact cars to spacious SUVs, luxury cars, and everything in between. We have the perfect vehicle for every occasion.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Exceptional Service',
    description:
      'Our team is dedicated to ensuring a seamless and enjoyable car rental experience. We are here to assist you every step of the way from vehicle selection to drop-off.',
    icon: LockClosedIcon,
  },
  {
    name: 'Environmental Responsibility',
    description:
      'Your safety is our priority. We meticulously maintain and sanitize our vehicles, and our experienced drivers are committed to your security on the road.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
      'We are actively working to reduce our carbon footprint by offering eco-friendly vehicle options and adopting sustainable practices.',
    icon: FingerPrintIcon,
  },
];

function About() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl grid grid-cols-1 gap-x-8 gap-y-10 lg:max-w-4xl lg:grid-cols-2 lg:gap-y-16">
          <div className="mx-auto max-w-2xl lg:text-left">
            <h2 className="font-bold leading-7 text-3xl text-newGreen sm:text-4xl">About Us</h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-500 sm:text-2xl">
              Your Trusted Car Rental Partner
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              At Car rental, we are more than just a car rental service; we are
              your trusted partner in making your journeys memorable and hassle-free. With a
              passion for cars and a commitment to exceptional customer service, we have been
              serving travelers and locals alike since 2015.
            </p>
          </div>
          <div className="mx-auto max-w-2xl lg:text-left">
            <h2 className="font-bold leading-7 text-3xl text-newGreen sm:text-4xl">Our Mission</h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-500 sm:text-2xl">
              Your Trusted Car Rental Partner
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              Our mission is to empower you to explore the world at your own pace, in your
              dream car. We believe that a well-maintained, high-quality vehicle can turn
              an ordinary trip into an extraordinary adventure. Whether you are planning a
              business trip, family vacation, or a weekend getaway, we are here to provide
              the perfect vehicle to match your needs.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <h2 className="font-bold leading-7 my-20 text-center text-3xl text-newGreen sm:text-4xl">Our Mission</h2>
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-newGreen">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-white">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default About;
