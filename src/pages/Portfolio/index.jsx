import React from "react";
import { Helmet } from "react-helmet";
import { Img, Text, Button, Heading } from "../../components";

const ID_LINK_OBJECT = {
  AIS: "https://github.com/pathakjiop/Ayurvedic-Information-System",
  CSM: "https://github.com/pathakjiop/Cloth-Shop-Mangament-System",
  HL: "https://github.com/pathakjiop/Healthy-Lifestyle",
};

export default function PortfolioPage() {
  const handleGithubLinkClick = (e) => {
    window.open(ID_LINK_OBJECT[e.target.id]);
  };

  const handleDownloadResume = () => {
    const resumePath = "/pdf/Atharv Pathak's Resume.pdf";

    // Initiate the download
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "Atharv_Pathaks_Resume.pdf"; // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Helmet>
        <title>Portfolio</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex flex-col items-center w-full gap-[63px] sm:gap-[31px] bg-gray-900">
        <header className="flex justify-center items-center w-[94%] mt-[33px] py-[5px] bg-light_blue-50_2b rounded-[20px]">
          <div className="flex justify-center">
            <ul className="flex justify-center gap-[47px] p-[17px] sm:flex-wrap">
              <li>
                <a href="#" className="mt-1 mb-0.5">
                  <Text size="xs" as="p">
                    Home
                  </Text>
                </a>
              </li>
              <li>
                <a onClick={() => scrollToSection("about")}>
                  <Text size="xs" as="p">
                    About
                  </Text>
                </a>
              </li>
              <li>
                <a onClick={() => scrollToSection("projects")}>
                  <Text size="xs" as="p">
                    Projects
                  </Text>
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("contact")}
                  className="mb-0.5"
                >
                  <Text size="xs" as="p">
                    Contact
                  </Text>
                </a>
              </li>
              <li>
                <a onClick={handleDownloadResume} className="mb-0.5">
                  <Text size="xs" as="p">
                    Resume
                  </Text>
                </a>
              </li>
            </ul>
          </div>
        </header>
        <div className="self-stretch">
          <div className="flex flex-col items-center">
            <div className="h-[783px] w-[93%] relative">
              <div className="flex flex-col w-[92%] bottom-0 left-[2%] m-auto absolute">
                <div className="flex md:flex-col items-start">
                  <Text
                    size="md"
                    as="p"
                    className="mt-[65px] !text-blue_gray-400 tracking-[-0.32px] z-[1]"
                  >
                    Hello, I am a passionate full stack Web Developer from
                    INDIA.{" "}
                  </Text>
                  <Img
                    src="images/img_moon_art.svg"
                    alt="moonart_one"
                    className="h-[285px] md:w-full md:h-auto ml-[-94px] md:ml-0"
                  />
                </div>
                <div className="h-[321px] w-[3px] mt-[-113px] bg-gradient shadow-xs" />
              </div>
              <div className="flex flex-col items-end w-full top-0 right-0 left-0 m-auto absolute">
                <Img
                  src="images/img_small_celestial_fog.svg"
                  alt="smallcelestial"
                  className="h-[123px] mr-[108px] md:mr-0 z-[1]"
                />
                <div className="flex flex-col self-stretch items-end mt-[-123px]">
                  <Img
                    src="images/img_small_celestial_fog.svg"
                    alt="smallcelestial"
                    className="h-[123px] mr-[108px] md:mr-0 z-[1]"
                  />
                  <Img
                    src="images/img_home_pattern_1_1.png"
                    alt="homepatternone"
                    className="self-stretch h-[659px] w-full md:h-auto mt-[-74px] object-cover"
                  />
                </div>
              </div>
              <Heading
                as="h1"
                className="left-[2%] top-[20%] m-auto tracking-[-0.96px] absolute"
              >
                Atharv Pathak
              </Heading>
              <div className="h-[321px] w-[3px] bottom-0 left-[2%] m-auto bg-gradient shadow-xs absolute" />
              <Img
                src="images/img_home_pattern_1_1.png"
                alt="homepatternone"
                className="h-[659px] w-full md:h-auto top-[6%] right-0 left-0 m-auto object-cover absolute"
              />
              <Img
                src="images/img_moon_art.svg"
                alt="moonart_three"
                className="h-[285px] bottom-[27%] right-[8%] m-auto absolute"
              />
              <Heading
                as="h2"
                className="left-[2%] top-[20%] m-auto tracking-[-0.96px] absolute"
              >
                Atharv Pathak
              </Heading>
            </div>
            <div className="flex flex-col items-center w-full mt-11 mx-auto md:p-5 max-w-[1434px]">
              <div className="self-stretch bg-gray-900">
                <div className="flex flex-col items-center gap-5">
                  <div className="flex self-stretch">
                    <div className="flex flex-col w-[74%] md:w-full ml-10 md:ml-0">
                      <div
                        className="flex justify-between items-start w-[33%] md:w-full gap-5"
                        id="about"
                      >
                        <Img
                          src="images/img_icon.svg"
                          alt="icon_one"
                          className="h-[20px] w-[20px] mt-5"
                        />
                        <Text
                          size="lg"
                          as="p"
                          className="!text-green-300 tracking-[-0.24px]"
                        >
                          About Me
                        </Text>
                      </div>
                      <div className="flex md:flex-col justify-between items-start ml-[11px] gap-5 md:ml-0">
                        <div className="h-full w-[3px] md:w-full md:h-[3px] bg-gradient6 rounded-[1px]" />
                        <Text
                          size="md"
                          as="p"
                          className="w-[90%] md:w-full mt-[51px] tracking-[-1.44px]"
                        >
                          <span className="text-green-300">
                            I am currently pursuing Bachelor of Engineering (BE)
                          </span>
                          <span className="text-white-A700">
                            , from Shri Sant Gajanan Maharaj College Of
                            Engineering Shegaon, Maharashtra.{" "}
                          </span>
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-[91%] md:w-full">
                    <div>
                      <div className="flex md:flex-col items-center">
                        <Img
                          src="images/img_cloud_line_art.svg"
                          alt="cloudlineart"
                          className="self-end h-[221px] md:w-full md:h-auto mb-[63px] z-[1]"
                        />
                        <div className="flex flex-col items-end ml-[-344px] md:ml-0 flex-1">
                          <div className="flex self-stretch justify-end p-7 sm:p-5 border-blue_gray-900 border border-solid bg-gray-900_01 shadow-md rounded-lg">
                            <Text
                              as="p"
                              className="w-[91%] mb-[81px] mr-[72px] md:mr-0"
                            >
                              <>
                                My journey in the world of programming began in
                                2020 with an optional subject called Information
                                Technology. Since then, I&#39;ve immersed myself
                                in various technologies and frameworks, honing
                                my skills to become proficient in both frontend
                                and backend development. Beyond coding, I&#39;m
                                always eager to stay updated on the latest
                                industry trends and technologies. I thrive in
                                dynamic environments where I can continually
                                learn and grow, pushing myself to tackle new
                                challenges and expand my skill set.
                                <br />
                                <br /> In addition to my technical skills,
                                I&#39;m a strong communicator and a
                                collaborative team player. I believe that
                                effective communication is essential for
                                successful project outcomes, and I always strive
                                to maintain open lines of communication with
                                stakeholders throughout the development process.
                              </>
                            </Text>
                          </div>
                          <div className="flex justify-end w-[68%] md:w-full mt-[-141px] mr-[53px] pl-14 pr-[67px] py-[67px] md:mr-0 md:p-5 border-gray-600 border-t border-l border-solid bg-gray-900_01 shadow-xs rounded-[15px]">
                            <Text as="p" className="w-[97%] mt-[7px] mb-[9px]">
                              <>
                                Backend: Python for scalable systems and MySQL
                                for database management.
                                <br />
                                Frontend: ReactJS, HTML, CSS, and JavaScript for
                                dynamic interfaces.
                                <br />
                                Full-Stack: Seamless integration and performance
                                optimization.
                                <br />
                                Languages: Proficient in Java, C, and C++.
                                <br />
                                NodeJS: Real-time applications with speed and
                                scalability.
                                <br />
                                Design Collaboration: Skilled in Figma for
                                interface design.
                                <br />
                                Styling: Bootstrap for visually appealing,
                                responsive layouts.
                                <br />
                              </>
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[268px] w-[4px] ml-1 md:ml-0 bg-gradient1 shadow-xs rounded-[50%]" />
                  </div>
                </div>
              </div>
              <div className="w-[91%] md:w-full mt-[19px]">
                <div className="flex flex-col">
                  <div className="flex justify-between items-start w-[22%] md:w-full gap-5 z-[1]">
                    <div className="h-[32px] w-[32px] mt-[9px] relative">
                      <div
                        className="justify-center h-[32px] w-[32px] left-0 bottom-0 right-0 top-0 m-auto bg-deep_orange-200 backdrop-opacity-[0.5] blur-[28.00px] absolute rounded-[50%]"
                        id="projects"
                      />
                      <Img
                        src="images/img_vector.svg"
                        alt="vector_one"
                        className="h-[26px] bottom-[6%] right-0 left-0 m-auto absolute"
                      />
                    </div>
                    <Text
                      size="lg"
                      as="p"
                      className="!text-deep_orange-200 tracking-[-0.24px]"
                    >
                      Projects
                    </Text>
                  </div>
                  <div className="flex flex-col ml-[9px] gap-[49px] md:ml-0">
                    <div className="flex md:flex-col justify-center items-start">
                      <div className="h-[749px] w-[3px] md:w-[749px] md:h-[3px] mb-[535px] z-[2] bg-gradient4" />
                      <div className="h-[475px] ml-[-1px] md:ml-0 z-[1] bg-gradient5 flex-1 rounded-[1px]" />
                      <div className="h-[2198px] w-full mt-7 ml-[-2px] md:ml-0 relative">
                        <div className="h-[493px] w-[91%] right-0 top-0 m-auto absolute">
                          <div className="h-[493px] w-[94%] left-0 bottom-0 top-0 my-auto border-blue_gray-900 border-t border-l border-solid bg-gray-900_01 shadow-xs absolute rounded-lg" />
                          <div className="w-full top-0 right-0 left-0 m-auto absolute">
                            <div className="flex pl-16 pr-14 py-16 md:p-5">
                              <Text as="p" className="w-[93%] !text-blue-50_7f">
                                <a
                                  href="#"
                                  className="text-orange-200 text-[32px] underline"
                                >
                                  <>
                                    Ayurvedic Information System
                                    <br />
                                  </>
                                </a>
                                <span className="text-blue_50_01">
                                  <>
                                    <br />
                                    The Ayurvedic Information System is a
                                    comprehensive platform designed to provide
                                    users with detailed information about
                                    Ayurvedic practices, treatments, herbs, and
                                    wellness advice. This system is built using
                                    a ReactJS frontend and a Python backend to
                                    deliver a seamless and interactive user
                                    experience. <br />
                                    <br />
                                    Technologies Used - ReactJS,Python,Gemini
                                    API
                                  </>
                                </span>
                              </Text>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-end w-[52%] gap-[45px] left-[2%] top-[20%] p-[38px] m-auto sm:p-5 border-gray-700_aa border-t border-l border-solid bg-gray-900_01 shadow-xs absolute rounded-[15px]">
                          <Img
                            src="images/img_screenshot_2024_03_22.png"
                            alt="screenshot2024"
                            className="self-stretch md:h-auto mt-[29px] object-cover rounded-[10px]"
                            href="https://github.com/pathakjiop/Ayurvedic-Information-System"
                          />
                          <Button
                            onClick={handleGithubLinkClick}
                            id="AIS"
                            shape="round"
                            className="mb-2.5 ml-1 md:ml-0 sm:px-5"
                          >
                            Github Link
                          </Button>
                        </div>
                        <div className="w-[41%] right-[4%] top-1/4 px-10 py-[58px] m-auto md:p-5 border-gray-800_01 border-t border-l border-solid bg-gray-900_01 shadow-xs absolute rounded-lg ">
                          <Text as="p" className="my-[21px] !text-blue-50_7f">
                            <span className="text-orange-200 text-[32px]">
                              <>
                                Cloth Shop Management System
                                <br />
                                <br />
                              </>
                            </span>
                            <span className="text-blue_50_01">
                              <>
                                The Cloth Shop Management System is a
                                comprehensive application designed to facilitate
                                the management of cloth shop operations,
                                including inventory management, sales tracking,
                                and customer management. This system is built
                                using Python, with MySQL serving as the backend
                                database and Tkinter for the graphical user
                                interface (GUI), making it both efficient and
                                user-friendly..
                                <br /> <br />
                              </>
                            </span>
                            <span className="text-blue_gray-400">
                              Technologies Used -Python, MySQL, Tkinter GUI
                            </span>
                          </Text>
                        </div>
                        <div className="flex sm:flex-col items-center w-[53%] gap-[11px] bottom-1/4 left-0 m-auto absolute">
                          <Img
                            src="images/img_git_branch_productivity_svg.png"
                            alt="gitbranch_one"
                            className="w-[12%] sm:w-full sm:h-auto object-cover"
                          />
                          <div className="flex flex-col p-[47px] md:p-5 border-gray-800 border-t border-l border-solid bg-gray-900_01 shadow-xs flex-1 rounded-[15px]">
                            <Text as="p" className="mt-[11px]">
                              <span className="text-orange-200 text-[32px]">
                                <>
                                  Experience Gained
                                  <br />
                                  <br />
                                </>
                              </span>
                              <span className="text-white-A700">
                                <>
                                  The Ayurvedic Information System is a ReactJS
                                  frontend and Python backend project providing
                                  comprehensive Ayurvedic knowledge and wellness
                                  advice. It leverages Gemini API for
                                  personalized experiences. Through
                                  troubleshooting and support channels, the team
                                  gained valuable experience in project
                                  development and user engagement.
                                  <br />
                                </>
                              </span>
                              <span className="text-blue_gray-400">
                                <>
                                  Creating the Cloth Shop Management System
                                  provided valuable experience in developing
                                  efficient Python-based applications with MySQL
                                  backend and Tkinter GUI. Improved inventory
                                  management, sales tracking, and customer
                                  service processes.
                                  <br />
                                </>
                              </span>
                            </Text>
                          </div>
                        </div>
                        <div className="h-[523px] w-[86%] bottom-0 left-[2%] m-auto border-gray-800 border-t border-l border-solid bg-gray-900_01 shadow-xs absolute rounded-[15px]" />
                        <div className="flex flex-col items-start justify-center w-[41%] gap-[34px] bottom-[23%] right-[4%] p-3.5 m-auto border-gray-600_aa border-t border-l border-solid bg-gray-900_01 shadow-sm absolute rounded-[15px]">
                          <Img
                            src="images/img_screenshot_2024_03_22_257x470.png"
                            alt="screenshot2024"
                            className="self-stretch md:h-auto mt-[31px] ml-1 md:ml-0 object-cover rounded-[10px]"
                          />
                          <Button
                            onClick={handleGithubLinkClick}
                            id="CSM"
                            shape="round"
                            className="mb-9 ml-7 md:ml-0 sm:px-5"
                          >
                            Github Link
                          </Button>
                        </div>
                        <div className=" flex flex-col items-start w-[80%] bottom-[2.9%] left-[6%] m-auto absolute">
                          <Text as="p">
                            <span className="text-orange-200 text-[32px]">
                              <>
                                Healthy Lifestyle
                                <br />
                                <br />
                              </>
                            </span>
                            <span className="text-white-A700">
                              <>
                                Creating the Healthy Lifestyle project provided
                                invaluable experience in integrating Python
                                backend with ReactJS frontend and utilizing the
                                Gemini API for personalized BMI calculations.
                                Developing an interactive questionnaire enhanced
                                user engagement and understanding of healthy
                                lifestyle choices. <br />
                              </>
                            </span>
                            <span className="text-blue_gray-400">
                              <>
                                The project&#39;s emphasis on tailored advice
                                and actionable steps fostered a deeper
                                understanding of user needs and preferences in
                                promoting wellness. <br />
                                Collaborative development encouraged learning
                                and innovation, fostering a dynamic environment
                                for continuous improvement and community
                                contribution.
                              </>
                            </span>
                          </Text>
                          <Button
                            // size="xs"
                            // shape="round"
                            // className="mt-40px ml-[63px] md:ml-0 sm:px-5 !rounded-[22px]"
                            onClick={handleGithubLinkClick}
                            id="HL"
                            shape="round"
                            className="mt-5 mb-0 ml-30 md:ml-0 sm:px-50"
                          >
                            Github Link
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end p-14 md:p-5 border-gray-800 border-t border-l border-solid bg-gray-900_01 shadow-xs rounded-[15px]">
                      <Text
                        as="p"
                        className="w-[94%] mt-[5px] mr-[52px] md:mr-0"
                      >
                        <span className="text-orange-200 text-[32px]">
                          <>
                            Currently Working On
                            <br />
                          </>
                        </span>
                        <span className="text-white-A700">
                          <>
                            <br />
                            Password Manager
                            <br />
                          </>
                        </span>
                        <span className="text-blue_gray-400">
                          <>
                            The Password Manager project employs ReactJS for
                            frontend, Python backend, and MySQL database. It
                            offers secure password storage, retrieval, and
                            generation. <br />
                            Users can register/login, store/update passwords,
                            and generate strong passwords. <br />
                            Enhanced security measures and user-friendly
                            features ensure a seamless and protected password
                            management experience.
                            <br />
                            <br />
                          </>
                        </span>
                        <span className="text-white-A700">
                          <>
                            Hospital QR Report
                            <br />
                          </>
                        </span>
                        <span className="text-blue_gray-400">
                          <>
                            The Hospital QR Report project, developed using
                            React Native for frontend, Python backend, and MySQL
                            database, streamlines hospital reporting processes.{" "}
                            <br /> It allows generation and scanning of QR codes
                            for medical reports, ensuring efficient data
                            retrieval. <br />
                            This enhances hospital workflow and improves patient
                            care through quick and secure access to medical
                            information.
                            <br />
                            <br />
                          </>
                        </span>
                        <span className="text-white-A700">
                          <>
                            Climate AI Chatbot
                            <br />
                          </>
                        </span>
                        <span className="text-blue_gray-400">
                          <>
                            The Climate AI Chatbot project utilizes ReactJS for
                            frontend, Python backend, and Gemini API. It
                            delivers real-time climate data analysis, forecasts,
                            and insights. <br /> With intuitive interfaces,
                            users gain valuable climate information, enabling
                            informed decisions and proactive measures towards
                            environmental sustainability.
                            <br />
                          </>
                        </span>
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex self-stretch mt-[142px] pl-[59px] pr-14 md:px-5 bg-gray-900">
                <div className="flex md:flex-col items-start w-[97%] md:w-full gap-10">
                  <div className="flex flex-col items-center w-[2%] md:w-full gap-7">
                    <div className="h-[160px] w-[3px] bg-gradient2 rounded-[1px]" />
                    <Img
                      src="images/img_icon_indigo_a100.svg"
                      alt="icon_three"
                      className="h-[24px] w-full md:w-[24px] md:h-auto"
                    />
                    <div className="h-[275px] w-[3px] bg-gradient3 rounded-[1px]" />
                  </div>
                  <div
                    className="h-[456px] md:w-full mt-[17px] flex-1 relative md:flex-none"
                    id="contact"
                  >
                    <Text
                      size="md"
                      as="p"
                      className="w-[78%] bottom-0 left-0 m-auto tracking-[-1.44px] absolute"
                    >
                      <span className="text-white-A700">
                        Thank you for visiting my portfolio website! Whether you
                        have questions about my projects,
                      </span>
                      <span className="text-indigo-A100">
                        want to discuss potential collaborations, or simply want
                        to say hello, I&#39;d love to hear from you. Feel free
                        to reach out using any of the methods below.{" "}
                      </span>
                    </Text>
                    <Text
                      size="lg"
                      as="p"
                      className="left-0 top-[32%] m-auto !text-indigo-A100 tracking-[-0.24px] absolute"
                    >
                      Contact
                    </Text>
                    <Img
                      src="images/img_celestial_fog_small.svg"
                      alt="celestialfog"
                      className="h-[325px] right-0 top-0 m-auto absolute"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[546px] mt-[2px] pt-[98px] md:pt-5 z-[1] border-blue_gray-900 border border-solid bg-gray-900_01 relative rounded-lg">
              <div className="justify-center h-[448px] w-full left-0 bottom-0 right-0 top-0 m-auto absolute">
                <Img
                  src="images/img_footer_graphic_large.png"
                  alt="footergraphic"
                  className="justify-center h-[448px] w-full md:h-auto left-0 bottom-0 right-0 top-0 m-auto object-cover absolute"
                />
                <div className="flex justify-between items-center w-[40%] right-[28%] top-[11%] gap-5 m-auto absolute">
                  <a
                    href="https://www.linkedin.com/in/pathak-ji-op"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Img
                      src="images/img_vector_indigo_a100.svg"
                      alt="vector_three"
                      className="self-start h-[42px] w-[43px]"
                    />
                  </a>
                  <a
                    href="https://github.com/pathakjiop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Img
                      src="images/img_vector_indigo_a100_43x43.svg"
                      alt="vector_five"
                      className="h-[43px] w-[43px]"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
