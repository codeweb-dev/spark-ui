"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import React from "react";

export type PetType = "cat" | "dog" | "bird";

export type PetConfig = {
  id: PetType;
  name?: string;
  initialPosition?: { x: number; y: number };
  idleMessage?: string | string[];
  fedMessage?: string;
};

export type InteractivePetsProps = {
  pets?: PetConfig[];
  className?: string;
  playgroundClassName?: string;
  showInstructions?: boolean;
  instructionText?: string;
  onPetMove?: (pet: PetType, position: { x: number; y: number }) => void;
  onPetFeed?: (pet: PetType) => void;
};

const PET_DEFAULTS: Record<
  PetType,
  Required<Omit<PetConfig, "id">> & { food: string }
> = {
  cat: {
    name: "Mochi",
    initialPosition: { x: 24, y: 64 },
    idleMessage: ["do not perceive me.", "busy napping.", "you may proceed."],
    fedMessage: "purr. accepted.",
    food: "fish",
  },
  dog: {
    name: "Biscuit",
    initialPosition: { x: 128, y: 152 },
    idleMessage: ["hi. HI. HELLO.", "walk time?", "you are my favorite."],
    fedMessage: "A BONE?! FOR ME?!",
    food: "bone",
  },
  bird: {
    name: "Pip",
    initialPosition: { x: 216, y: 48 },
    idleMessage: ["observing.", "a curious development.", "chirp."],
    fedMessage: "delightful",
    food: "seeds",
  },
};

const DEFAULT_PETS: PetConfig[] = [
  { id: "cat" },
  { id: "dog" },
  { id: "bird" },
];

const DEFAULT_INSTRUCTIONS =
  "Drag a pet anywhere, click it to chat, or tap its bowl to feed it.";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

/* ------------------------------- Artwork -------------------------------- */

type SpriteProps = { idle: boolean; className?: string; draggable?: boolean };

export function CatSprite({ idle, className, draggable }: SpriteProps) {
  return (
    <motion.svg
      viewBox="0 0 736 736"
      fill="currentColor"
      className={cn(
        "text-black dark:text-white",
        draggable && "z-20 cursor-grab active:cursor-grabbing",
        className,
      )}
      drag={draggable}
      dragMomentum={false}
      aria-hidden
      initial={false}
      animate={idle ? { rotate: [0, 2, 0, -2, 0] } : { rotate: 0 }}
      transition={
        idle
          ? {
              duration: 3.6,
              repeat: Infinity,
              repeatDelay: 2.4,
              ease: "easeInOut",
            }
          : { duration: 0.3 }
      }
      style={{ transformOrigin: "50% 100%", touchAction: "none" }}
    >
      <path d="M568.459534,460.487183 C583.162292,471.177673 596.133606,483.142334 605.154602,498.672028 C612.740784,511.731415 617.499084,525.949402 619.325806,540.982910 C625.409973,591.053101 602.566772,627.178406 563.604187,655.243347 C543.926147,669.417725 521.988281,679.218994 498.503754,684.810181 C477.499939,689.810669 456.198059,693.402954 434.479797,694.604248 C420.392029,695.383484 406.415039,697.718628 392.215393,696.361267 C376.981323,694.905090 361.768127,693.366882 346.976624,689.226685 C334.031830,685.603394 325.255890,677.173767 320.415009,664.801392 C315.481506,652.192261 321.957581,642.450684 329.461334,633.443542 C338.483887,622.613159 351.093628,619.008240 364.508972,617.672119 C381.645142,615.965393 398.714233,618.800781 415.830414,618.643982 C448.991882,618.340271 481.604248,614.678406 512.543213,601.782593 C536.839783,591.655396 550.640442,572.923157 555.391174,547.412537 C557.062622,538.437317 554.258240,530.165161 548.322815,523.253235 C535.343506,508.138733 518.037476,500.905548 499.101624,496.775391 C496.561432,496.221344 495.581512,497.239563 495.184021,499.802551 C493.374054,511.473114 488.930634,522.305786 483.114868,532.417664 C472.047089,551.661072 455.074188,564.692993 435.852509,574.953979 C414.426514,586.391602 391.458405,591.819092 367.162231,591.290771 C363.354248,591.207947 361.138763,592.511902 359.181335,595.819031 C349.384216,612.371521 334.646484,620.674683 315.460358,620.967712 C308.652832,621.071655 301.852264,621.328247 295.082520,619.721863 C273.788513,614.668945 262.316864,596.718872 266.956726,575.291809 C267.443939,573.041992 268.308777,570.846497 267.528259,568.516968 C265.563171,567.567993 264.289856,569.034729 262.878052,569.693604 C244.059692,578.475769 214.651733,573.749756 200.739624,559.665771 C189.823318,548.614746 188.260284,532.330811 196.805969,519.345581 C200.034622,514.439575 203.856232,510.001465 208.106430,506.033081 C217.564194,497.202393 219.958954,485.511383 221.565247,473.574554 C222.226379,468.661407 221.513794,463.578857 221.810669,458.596283 C222.046524,454.637878 220.313690,452.684448 216.871338,451.013489 C189.812744,437.878601 166.635010,419.675110 147.320663,396.646362 C130.409042,376.482452 122.041138,353.045197 119.419632,326.882416 C116.209419,294.844177 121.323662,264.326904 134.647156,235.429977 C152.223953,197.308167 174.162125,161.887482 202.854706,130.828308 C216.570633,115.981064 229.940613,100.860565 247.220810,90.071693 C259.065674,82.676369 270.014496,73.787544 283.019135,68.274635 C290.143585,65.254440 297.611847,63.686348 305.223755,62.746910 C314.021179,61.661156 321.604736,64.194199 327.995728,70.509941 C340.614258,82.979935 351.184265,96.763748 355.674194,114.281990 C358.237915,124.284790 362.687317,130.645874 373.866272,134.002213 C398.580536,141.422333 420.916992,154.190414 441.266296,170.229294 C446.252197,174.159073 452.509918,173.413681 458.114960,173.472534 C480.141632,173.703812 501.711945,176.891190 522.148926,184.806091 C540.874878,192.058350 559.551880,199.951294 575.054749,213.390671 C586.599243,223.398560 589.087524,236.385254 587.881104,250.944763 C586.407227,268.731689 576.396118,282.606659 567.838135,297.191620 C557.065491,315.550812 543.217834,331.474609 528.919861,347.148621 C512.706177,364.922668 495.254547,381.254272 476.569733,396.357391 C472.975555,399.262604 468.662750,402.509033 467.204651,406.516144 C465.368408,411.562653 472.012451,413.577484 474.387421,417.348877 C477.663849,422.551727 481.385559,427.483765 484.400116,432.873108 C485.571167,434.966705 486.921539,436.994080 489.760010,436.554596 C502.482330,434.584900 514.544373,438.097839 526.554871,441.268768 C541.465149,445.205261 555.339478,451.654144 568.459534,460.487183 M284.133331,307.551239 C279.530792,321.262451 277.873962,335.330048 278.093109,349.793274 C278.473816,374.918762 285.502136,397.720856 301.044830,417.542725 C314.651306,434.895355 332.275208,446.166382 354.447357,448.532654 C380.154083,451.276123 402.709229,442.819672 421.062469,425.100952 C457.524384,389.899597 468.144318,346.970825 455.205719,298.491699 C449.012360,275.285950 435.999542,255.826019 414.857147,243.374588 C384.826813,225.688751 355.281189,228.780060 327.096222,247.999481 C305.935699,262.428925 292.754547,282.938538 284.133331,307.551239 M139.851822,248.304214 C130.779984,275.684418 126.882874,303.565918 131.328888,332.341614 C134.510223,352.932037 141.068558,372.028748 154.609772,388.298157 C166.185852,402.206482 189.838913,407.502411 206.147186,399.786865 C219.604263,393.420227 230.622650,384.098206 238.478378,371.555969 C263.760712,331.191010 270.449310,287.501831 259.933044,241.302277 C256.217255,224.978195 250.154984,209.320602 236.901260,197.873428 C228.488449,190.607315 219.385818,184.143982 207.625351,184.418671 C194.771896,184.718903 183.249161,189.174301 173.145096,197.258636 C156.657410,210.450546 147.213913,228.224625 139.851822,248.304214 M494.872528,353.170929 C494.737732,355.764618 492.227356,358.314758 494.491180,360.996460 C496.754761,360.876923 497.963959,359.377869 499.342438,358.231934 C520.711914,340.467041 539.494324,320.341583 554.679504,297.004211 C563.546692,283.376617 573.141052,270.088745 575.116150,253.166611 C575.919861,246.280365 575.649841,245.607880 568.604065,246.373108 C544.242798,249.018967 523.208740,259.613739 503.599274,273.629547 C501.399017,275.202179 500.944824,277.043610 501.267822,279.616852 C502.052856,285.871307 502.899994,292.149719 503.107941,298.438812 C503.718018,316.890961 500.540009,334.832092 494.872528,353.170929 z" />
      <path d="M352.422668,409.901794 C332.241455,401.063904 322.141266,384.744751 318.054779,364.537140 C312.351318,336.333893 318.657593,310.472504 336.871582,288.219513 C350.700470,271.324005 368.595947,262.100708 391.029663,266.747742 C409.687988,270.612701 421.489990,283.201508 428.442200,300.352020 C442.546570,335.146240 431.738525,377.985809 402.909454,400.853760 C388.025299,412.660217 371.233032,416.490723 352.422668,409.901794 z" />
      <path d="M230.807251,334.671265 C226.242142,342.755920 220.698547,349.528748 213.737259,355.150940 C196.671158,368.934174 174.943420,365.957458 162.170242,348.175507 C155.067596,338.287720 151.366379,327.053131 150.185959,315.238586 C147.551544,288.871216 152.513977,264.168152 168.832870,242.591370 C173.686859,236.173416 179.638443,230.870926 187.020096,227.310394 C202.363800,219.909393 218.971588,223.769745 229.525986,237.146271 C237.865204,247.715271 241.827698,260.073792 243.043335,273.097076 C245.047989,294.573547 241.625458,315.238678 230.807251,334.671265 z" />
    </motion.svg>
  );
}

export function DogSprite({ idle, className }: SpriteProps) {
  return (
    <motion.svg
      viewBox="80 330 420 450"
      fill="currentColor"
      className={cn("text-black dark:text-white", className)}
      aria-hidden
      initial={false}
      animate={idle ? { y: [0, -2, 0] } : { y: 0 }}
      transition={
        idle
          ? {
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 1.8,
              ease: "easeInOut",
            }
          : { duration: 0.2 }
      }
    >
      <path d="M272.339600,738.915344 C265.127319,754.840088 252.166382,760.772461 236.018997,761.284668 C226.208771,761.595886 216.402924,761.885315 206.905441,758.289856 C198.463806,755.094116 191.510269,750.282593 187.488571,742.056580 C186.007889,739.027954 184.057800,738.228394 180.862259,738.091980 C167.678314,737.529419 155.158569,735.146423 144.889725,725.644653 C134.557968,716.084717 129.325333,704.211426 127.701363,690.574951 C124.477379,663.503235 130.399963,637.616272 138.470200,612.085327 C139.615829,608.460999 139.539780,605.645081 137.643326,602.236084 C132.182129,592.419189 135.170090,582.442444 138.228928,572.724915 C139.804932,567.718140 142.180222,563.417480 140.079727,557.550293 C138.199951,552.299622 139.830170,546.361267 141.850021,540.971008 C143.166412,537.458008 142.088074,535.849243 138.254410,535.337402 C109.700905,531.525635 92.515594,509.361664 90.924339,481.761078 C89.413078,455.548157 99.855804,433.323303 116.168831,413.615417 C131.143723,395.524048 148.447525,379.975800 168.909134,368.221680 C182.038391,360.679596 196.060913,357.490295 211.155518,360.603516 C213.078903,361.000183 214.764542,360.518738 216.440720,359.671967 C236.392258,349.592987 257.744232,345.247101 279.881805,343.560822 C308.420471,341.386993 336.154327,344.964661 362.675568,355.486542 C371.110626,358.832977 378.998779,360.282898 387.965424,359.684998 C401.903229,358.755615 413.895813,365.058990 425.082672,372.548828 C451.184784,390.024597 473.919250,410.911102 487.437164,439.875122 C496.798950,459.934082 500.121246,480.983459 491.222107,502.284363 C483.227203,521.420959 469.199738,533.187317 448.057800,535.380249 C445.300873,535.666138 444.254669,536.568909 444.965759,539.544250 C446.275360,545.023926 448.833923,550.721680 447.162537,556.194458 C444.969391,563.375916 447.707977,569.174561 449.645172,575.647583 C452.517303,585.244629 454.300293,595.226501 447.979950,604.511047 C446.729187,606.348511 447.147339,608.294373 447.807495,610.263367 C453.005493,625.767639 456.909210,641.606995 458.726959,657.851562 C460.339172,672.259155 461.067291,686.745300 457.056885,700.976990 C450.708771,723.504395 432.403961,737.778748 408.928406,738.092407 C403.964020,738.158813 400.918335,739.210693 398.332916,744.004944 C392.347015,755.104858 381.514618,759.588501 369.771210,760.821472 C358.911499,761.961609 347.804199,762.653076 337.073669,759.058350 C327.700806,755.918457 319.969330,750.818298 316.070862,741.254761 C315.298401,739.359802 314.294189,738.199158 312.077972,738.229065 C298.934570,738.406677 285.790344,738.525024 272.339600,738.915344 Z" />
      <path className="fill-background" d="M277.027740,498.365753 C276.482117,491.027039 278.813599,487.563477 285.442902,486.100647 C290.308838,485.026917 295.241547,484.393860 300.258423,485.680359 C304.660339,486.809174 308.603760,488.449310 309.939575,493.244812 C311.338531,498.266998 308.496582,501.836182 305.302490,505.167511 C303.712524,506.825806 301.212463,507.397461 299.974182,509.461670 C303.827484,515.675354 307.973877,517.499084 314.479126,515.419189 C317.906616,514.323303 320.424194,515.276428 322.320557,517.958069 C324.338135,520.811096 322.963928,523.555481 320.992371,525.651855 C316.417114,530.516602 309.987030,531.518921 304.960083,528.404114 C296.664062,523.263672 289.784576,523.554810 281.567139,528.436951 C276.980713,531.161865 271.033051,530.022888 266.756866,525.876648 C264.624939,523.809570 262.499725,521.242493 264.629547,517.968933 C266.605621,514.931702 269.420685,513.943359 272.839233,515.593262 C277.270325,517.731812 280.868073,515.985352 284.314697,513.274902 C286.840485,511.288605 287.335632,509.494568 284.238800,507.506409 C280.945343,505.391968 278.403503,502.569702 277.027740,498.365753 z" />
      <path className="fill-background" d="M326.426086,481.616638 C328.760284,473.714600 335.432312,468.431030 342.058685,468.935028 C348.775055,469.445923 355.065247,475.198151 356.177429,481.781799 C357.287018,488.350220 354.219269,493.085846 349.316467,496.786377 C344.884796,500.131287 340.046936,500.104462 335.278625,497.329102 C329.422150,493.920410 325.710968,489.211273 326.426086,481.616638 z" />
      <path className="fill-background" d="M255.366470,494.391663 C246.078339,501.334564 238.400818,500.147003 232.761673,491.193115 C228.499954,484.426392 231.765656,474.545563 239.596741,470.512695 C245.148300,467.653778 252.074677,469.092407 256.292542,473.980347 C260.880402,479.297211 261.516968,486.210846 257.859894,491.447266 C257.196289,492.397491 256.381622,493.242188 255.366470,494.391663 z" />
    </motion.svg>
  );
}

function BirdSprite({ idle, className }: SpriteProps) {
  return (
    <motion.svg
      viewBox="15 15 205 205"
      fill="currentColor"
      className={cn("text-black dark:text-white", className)}
      aria-hidden
      initial={false}
      animate={idle ? { y: [0, 2, 0, 3, 0] } : { y: 0 }}
      transition={
        idle
          ? {
              duration: 2.6,
              repeat: Infinity,
              repeatDelay: 1.8,
              ease: "easeInOut",
            }
          : { duration: 0.3 }
      }
    >
      <path d="M49.970634,170.867279 C48.711826,167.402283 47.605705,164.287354 46.424389,160.960648 C40.784294,162.372635 35.743565,165.118057 30.014675,165.472641 C23.075546,165.902161 20.179773,162.489655 22.195179,155.639328 C24.754969,146.938660 29.716797,139.323776 36.208900,133.476013 C44.827682,125.712646 48.669346,116.350906 51.544777,105.471848 C56.756466,85.753662 66.239899,68.344109 84.042023,56.729664 C89.365097,53.256794 95.504349,51.666428 101.191368,49.288422 C101.235023,46.713062 99.493050,45.389156 98.519997,43.716614 C96.713425,40.611328 95.516891,37.364281 95.828674,33.754837 C96.614944,24.652477 103.679070,20.646439 112.326080,24.625496 C115.206726,25.951073 117.036919,26.166042 119.758621,23.891392 C125.536980,19.062155 131.004425,21.297831 135.925262,30.101042 C140.701736,29.022802 145.459427,28.811680 148.441803,33.958996 C151.040665,38.444450 149.946014,43.089455 144.162262,52.361179 C144.190964,53.139847 144.703934,53.508759 145.352020,53.751720 C168.750839,62.523846 181.560196,80.582069 186.821426,103.862343 C189.532501,115.858528 192.901962,126.415260 202.635895,134.639053 C207.530487,138.774323 210.816193,144.705917 213.696533,150.569458 C214.787048,152.789444 215.799896,155.156219 216.237411,157.566910 C217.332642,163.601517 214.011414,166.774353 207.948410,165.945984 C202.155685,165.154556 196.798950,162.899490 190.828369,160.580276 C186.585373,182.945709 172.636169,195.997299 151.614395,202.539932 C154.801254,204.211151 157.294556,202.367172 159.917755,202.060684 C161.111328,201.921249 162.286667,201.750168 163.154236,202.772827 C164.121964,203.913574 163.661819,204.897629 162.677460,205.794830 C162.271530,206.164810 161.531815,206.170990 161.751938,207.190414 C162.675888,211.469101 162.619934,211.481186 158.121964,211.324219 C158.070450,212.807144 160.385223,214.320602 158.407913,215.687485 C156.612137,216.928879 155.188004,215.364716 154.066238,214.292542 C151.156906,211.511795 146.937866,209.863068 146.424576,204.942657 C146.217148,202.954239 144.240433,203.462875 142.731644,203.707718 C127.319420,206.208786 111.913345,206.190430 96.517235,203.542389 C93.634911,203.046646 91.970856,203.266144 90.905998,207.014160 C89.736290,211.131226 85.372147,213.423477 81.860260,215.930222 C81.170273,216.422729 80.272911,216.467270 79.533638,215.850647 C77.946930,214.527115 79.447479,213.135208 79.522903,211.776276 C78.051369,210.724731 75.528664,212.513153 74.738945,210.091965 C74.099258,208.130814 76.101593,207.747238 77.231949,206.769241 C76.135529,205.748306 73.877472,205.387817 74.829178,203.210449 C75.627380,201.384247 77.231560,201.959702 78.731522,202.190079 C81.212166,202.571060 83.580498,204.402115 86.769623,202.325333 C70.548767,196.465363 56.955921,187.700089 49.970634,170.867279 Z" />
      <path className="fill-background" d="M97.460464,117.752190 C99.680244,110.123886 112.494514,102.059761 120.008308,103.424385 C127.516762,104.788033 133.479034,108.933144 138.275223,114.725624 C140.892715,117.886848 140.401749,120.758202 136.904343,123.137596 C126.559563,130.175461 110.727760,129.869232 100.719528,122.377365 C99.229378,121.261871 97.868286,120.068924 97.460464,117.752190 z" />
      <path className="fill-background" d="M126.001648,136.040405 C129.182327,141.230087 131.602600,146.303558 131.294632,152.207611 C130.969254,158.445572 126.163979,161.227783 120.965340,157.812805 C118.230247,156.016144 116.234146,155.524216 113.436058,157.364212 C111.280693,158.781555 108.632996,159.039474 106.384415,157.416412 C103.959343,155.665970 103.637535,153.004593 104.095047,150.235687 C104.983231,144.860336 107.355309,140.124954 110.751320,135.951431 C115.435722,130.194519 120.633636,130.188187 126.001648,136.040405 z" />
      <path className="fill-background" d="M149.664642,113.481689 C145.030869,106.790718 146.893707,99.618134 153.185440,98.665619 C156.860916,98.109169 159.747787,99.435799 161.363266,102.868332 C163.194031,106.758347 162.499176,110.421371 159.456207,113.341690 C156.562500,116.118774 153.238754,116.075516 149.664642,113.481689 z" />
      <path className="fill-background" d="M75.734924,106.176636 C76.527824,102.098213 78.189743,99.231827 82.307518,98.699600 C85.831795,98.244095 88.429657,99.682785 90.100006,102.780525 C91.949364,106.210251 91.550171,109.477432 89.214584,112.527046 C87.154770,115.216583 84.299431,116.021790 81.234451,115.039650 C77.277519,113.771698 75.624756,110.670555 75.734924,106.176636 z" />
    </motion.svg>
  );
}

const SPRITES: Record<PetType, React.ComponentType<SpriteProps>> = {
  cat: CatSprite,
  dog: DogSprite,
  bird: BirdSprite,
};

const FOOD_EMOJIS: Record<PetType, string> = {
  cat: "🐟",
  dog: "🦴",
  bird: "🌾",
};

/* -------------------------------- Effects ------------------------------- */

const CRUMB_OFFSETS = [
  { x: -14, y: -6 },
  { x: -6, y: 10 },
  { x: 4, y: -12 },
  { x: 12, y: 6 },
  { x: 18, y: -4 },
];

function Crumbs() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
      {CRUMB_OFFSETS.map((offset, i) => (
        <motion.span
          key={i}
          className="absolute size-1 rounded-full bg-muted-foreground/70"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: offset.x, y: offset.y, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.7, delay: i * 0.04, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* --------------------------------- Pet ----------------------------------- */

type ResolvedPet = Required<PetConfig> & { food: string };

type PetActorProps = {
  pet: ResolvedPet;
  playgroundRef: React.RefObject<HTMLDivElement | null>;
  reduceMotion: boolean;
  feedCount: number;
  reactionVisible: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
  onMove: (position: { x: number; y: number }) => void;
};

function PetActor({
  pet,
  playgroundRef,
  reduceMotion,
  feedCount,
  reactionVisible,
  registerRef,
  onMove,
}: PetActorProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(pet.initialPosition.x);
  const y = useMotionValue(pet.initialPosition.y);
  const [dragging, setDragging] = React.useState(false);
  const [showIdleBubble, setShowIdleBubble] = React.useState(false);
  const idleMessages = Array.isArray(pet.idleMessage)
    ? pet.idleMessage
    : [pet.idleMessage];
  const [idleMessage, setIdleMessage] = React.useState(idleMessages[0]);
  const idleTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const [fx, setFx] = React.useState<{
    type: "settle" | "bounce";
    id: number;
  } | null>(null);

  const Sprite = SPRITES[pet.id];
  const idle = !reduceMotion && !dragging && !reactionVisible;

  // Bounce when a feeding lands (skip mount).
  const prevFeedCount = React.useRef(feedCount);
  React.useEffect(() => {
    if (feedCount > prevFeedCount.current) {
      setFx({ type: "bounce", id: feedCount });
    }
    prevFeedCount.current = feedCount;
  }, [feedCount]);

  // Keep the pet inside the playground when it resizes.
  React.useEffect(() => {
    const el = ref.current;
    const container = playgroundRef.current;
    if (!el || !container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      x.set(clamp(x.get(), 0, container.clientWidth - el.offsetWidth));
      y.set(clamp(y.get(), 0, container.clientHeight - el.offsetHeight));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [playgroundRef, x, y]);

  React.useEffect(() => () => clearTimeout(idleTimer.current), []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showRandomMessage();
      return;
    }
    const step = event.shiftKey ? 24 : 8;
    const delta = {
      ArrowLeft: { dx: -step, dy: 0 },
      ArrowRight: { dx: step, dy: 0 },
      ArrowUp: { dx: 0, dy: -step },
      ArrowDown: { dx: 0, dy: step },
    }[event.key];
    if (!delta) return;
    event.preventDefault();
    const el = ref.current;
    const container = playgroundRef.current;
    if (!el || !container) return;
    x.set(clamp(x.get() + delta.dx, 0, container.clientWidth - el.offsetWidth));
    y.set(
      clamp(y.get() + delta.dy, 0, container.clientHeight - el.offsetHeight),
    );
    onMove({ x: Math.round(x.get()), y: Math.round(y.get()) });
  };

  const showRandomMessage = () => {
    setIdleMessage(
      idleMessages[Math.floor(Math.random() * idleMessages.length)] ?? "",
    );
    setShowIdleBubble(true);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setShowIdleBubble(false), 2400);
  };

  return (
    <motion.div
      ref={(el) => {
        ref.current = el;
        registerRef(el);
      }}
      drag
      dragConstraints={playgroundRef}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{ scale: 1.1 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => {
        setDragging(false);
        if (!reduceMotion) setFx({ type: "settle", id: Date.now() });
        onMove({ x: Math.round(x.get()), y: Math.round(y.get()) });
      }}
      onClick={showRandomMessage}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-roledescription="draggable pet"
      aria-label={`${pet.name} the ${pet.id}. Click to chat, drag to move, or use arrow keys.`}
      style={{ x, y, touchAction: "none" }}
      className={cn(
        "pointer-events-auto absolute left-0 top-0 select-none rounded-2xl outline-none",
        "cursor-grab active:cursor-grabbing",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        dragging && "z-10",
      )}
    >
      <AnimatePresence>
        {(reactionVisible || showIdleBubble) && (
          <motion.div
            key={reactionVisible ? `fed-${feedCount}` : "idle"}
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6, scale: 0.9 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.95 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-popover px-2.5 py-1 text-[11px] leading-none text-popover-foreground shadow-sm"
          >
            {reactionVisible ? pet.fedMessage : idleMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        key={fx?.id ?? "rest"}
        animate={
          fx && !reduceMotion
            ? fx.type === "bounce"
              ? { scale: [1, 1.18, 0.94, 1], rotate: [0, -4, 4, 0] }
              : { scaleY: [1, 0.82, 1.06, 1], scaleX: [1, 1.1, 0.97, 1] }
            : undefined
        }
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="origin-bottom"
      >
        <Sprite
          idle={idle}
          className={cn(
            "h-14 w-14 sm:h-16 sm:w-16",
            pet.id === "bird" && "h-12 w-12 sm:h-14 sm:w-14",
          )}
        />
      </motion.div>
      {feedCount > 0 && !reduceMotion && (
        <Crumbs key={`crumbs-${feedCount}`} />
      )}
    </motion.div>
  );
}

/* ------------------------------ Component -------------------------------- */

type Flight = {
  id: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
};

export function InteractivePets({
  pets = DEFAULT_PETS,
  className,
  playgroundClassName,
  showInstructions = true,
  instructionText = DEFAULT_INSTRUCTIONS,
  onPetMove,
  onPetFeed,
}: InteractivePetsProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const playgroundRef = React.useRef<HTMLDivElement | null>(null);
  const petRefs = React.useRef<Partial<Record<PetType, HTMLDivElement | null>>>(
    {},
  );
  const buttonRefs = React.useRef<
    Partial<Record<PetType, HTMLButtonElement | null>>
  >({});
  const bubbleTimers = React.useRef<
    Partial<Record<PetType, ReturnType<typeof setTimeout>>>
  >({});
  const flightId = React.useRef(0);

  const [flights, setFlights] = React.useState<
    Partial<Record<PetType, Flight>>
  >({});
  const [feedCounts, setFeedCounts] = React.useState<
    Partial<Record<PetType, number>>
  >({});
  const [reactions, setReactions] = React.useState<
    Partial<Record<PetType, boolean>>
  >({});
  const [announcement, setAnnouncement] = React.useState("");

  const resolvedPets: ResolvedPet[] = pets.map((pet) => ({
    ...PET_DEFAULTS[pet.id],
    ...Object.fromEntries(
      Object.entries(pet).filter(([, value]) => value !== undefined),
    ),
    id: pet.id,
  }));

  React.useEffect(() => {
    const timers = bubbleTimers.current;
    return () => Object.values(timers).forEach(clearTimeout);
  }, []);

  const land = React.useCallback((pet: ResolvedPet) => {
    setFeedCounts((prev) => ({ ...prev, [pet.id]: (prev[pet.id] ?? 0) + 1 }));
    setReactions((prev) => ({ ...prev, [pet.id]: true }));
    setAnnouncement(`${pet.name} the ${pet.id} was fed. ${pet.fedMessage}`);
    clearTimeout(bubbleTimers.current[pet.id]);
    bubbleTimers.current[pet.id] = setTimeout(() => {
      setReactions((prev) => ({ ...prev, [pet.id]: false }));
    }, 2400);
  }, []);

  const feed = (pet: ResolvedPet) => {
    onPetFeed?.(pet.id);
    const wrapper = wrapperRef.current;
    const petEl = petRefs.current[pet.id];
    const buttonEl = buttonRefs.current[pet.id];
    if (reduceMotion || !wrapper || !petEl || !buttonEl) {
      land(pet);
      return;
    }
    const wrapperRect = wrapper.getBoundingClientRect();
    const petRect = petEl.getBoundingClientRect();
    const buttonRect = buttonEl.getBoundingClientRect();
    setFlights((prev) => ({
      ...prev,
      [pet.id]: {
        id: ++flightId.current,
        from: {
          x: buttonRect.left + buttonRect.width / 2 - wrapperRect.left,
          y: buttonRect.top + buttonRect.height / 2 - wrapperRect.top,
        },
        to: {
          x: petRect.left + petRect.width / 2 - wrapperRect.left,
          y: petRect.top + petRect.height / 2 - wrapperRect.top,
        },
      },
    }));
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("relative w-full select-none", className)}
    >
      <div
        ref={playgroundRef}
        className={cn(
          "relative h-64 w-full rounded-xl border border-border bg-muted/30 sm:h-80",
          playgroundClassName,
        )}
      >
        {resolvedPets.map((pet) => (
          <PetActor
            key={pet.id}
            pet={pet}
            playgroundRef={playgroundRef}
            reduceMotion={reduceMotion}
            feedCount={feedCounts[pet.id] ?? 0}
            reactionVisible={reactions[pet.id] ?? false}
            registerRef={(el) => {
              petRefs.current[pet.id] = el;
            }}
            onMove={(position) => onPetMove?.(pet.id, position)}
          />
        ))}
        <div className="absolute inset-x-4 bottom-3 flex justify-around">
          {resolvedPets.map((pet) => (
            <motion.button
              key={pet.id}
              type="button"
              ref={(el) => {
                buttonRefs.current[pet.id] = el;
              }}
              drag
              dragConstraints={playgroundRef}
              dragElastic={0}
              dragMomentum={false}
              whileDrag={{ scale: 1.1 }}
              onTap={() => feed(pet)}
              aria-label={`${pet.name}'s bowl. Drag to move or activate to feed ${pet.name} some ${pet.food}`}
              className="pointer-events-auto cursor-grab rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
              style={{ touchAction: "none" }}
            >
              <img
                src="/bowl.svg"
                alt=""
                className="h-10 w-14 dark:invert"
                draggable={false}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {showInstructions && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {instructionText}
        </p>
      )}

      {resolvedPets.map((pet) => {
        const flight = flights[pet.id];
        if (!flight) return null;
        return (
          <motion.div
            key={flight.id}
            initial={{ x: flight.from.x - 10, y: flight.from.y - 10, scale: 1 }}
            animate={{ x: flight.to.x - 10, y: flight.to.y - 10, scale: 0.5 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setFlights((prev) => ({ ...prev, [pet.id]: undefined }));
              land(pet);
            }}
            className="pointer-events-none absolute left-0 top-0 z-20 text-xl leading-none"
          >
            <span aria-hidden>{FOOD_EMOJIS[pet.id]}</span>
          </motion.div>
        );
      })}

      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}
