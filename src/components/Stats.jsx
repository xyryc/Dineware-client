import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Start the animation only once when it becomes visible
    threshold: 0.5, // Adjust the visibility threshold (50% of the element visible)
  });

  return (
    <div className="mt-36 mb-44">
      <div className="text-center pb-10">
        <h1 className="text-5xl font-semibold mb-16">
        We believe in making quality food
        </h1>
      </div>

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center text-center"
      >
        <div>
          <p className="text-[56px] font-bold">
            {inView && <CountUp end={10} duration={3} />}M+
          </p>
          <p className="text-lg">Happy Customers</p>
        </div>

        <div>
          <p className="text-[56px] font-bold">
            {inView && <CountUp end={98} duration={3} suffix="%" />}
          </p>
          <p className="text-lg">Customer Satisfaction</p>
        </div>

        <div>
          <p className="text-[56px] font-bold">
            {inView && <CountUp end={40} duration={4} />}+
          </p>
          <p className="text-lg">Our Branches</p>
        </div>

        <div>
          <p className="text-[56px] font-bold">
            {inView && <CountUp end={100} duration={3} />}+
          </p>
          <p className="text-lg">Total Employees</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
