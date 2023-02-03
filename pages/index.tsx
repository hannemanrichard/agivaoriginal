import Head from "next/head";
import axios from "axios";
import bg from "../public/background.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase-config";
import { useRouter } from "next/router";

import Countdown from "react-countdown";
export default function Home() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [offer, setOffer] = useState(1);
  const [province, setProvince] = useState("");
  const [number, setNumber] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [numberErr, setNumberErr] = useState(false);
  const [provinceErr, setProvinceErr] = useState(false);
  const [communeErr, setCommuneErr] = useState(false);
  const [commune, setCommune] = useState("");
  const [communes, setCommunes] = useState([
    { value: "Adrar", label: "Adrar - أدرار" },
    { value: "Akabli", label: "Akabli - اقبلي" },
    { value: "Aougrout", label: "Aougrout - أوقروت" },
    { value: "Aoulef", label: "Aoulef - أولف" },
    {
      value: "Bordj Badji Mokhtar",
      label: "Bordj Badji Mokhtar - برج باجي مختار",
    },
    { value: "Bouda", label: "Bouda - بودة" },
    { value: "Charouine", label: "Charouine - شروين" },
    { value: "Deldoul", label: "Deldoul - دلدول" },
    { value: "Fenoughil", label: "Fenoughil - فنوغيل" },
    { value: "In Zghmir", label: "In Zghmir - انزجمير" },
    { value: "Ksar Kaddour", label: "Ksar Kaddour - قصر قدور" },
    { value: "Metarfa", label: "Metarfa - المطارفة" },
    {
      value: "Ouled Ahmed Tammi",
      label: "Ouled Ahmed Timmi - أولاد أحمد تيمي",
    },
    { value: "Ouled Aïssa", label: "Ouled Aissa - أولاد عيسى" },
    { value: "Ouled Saïd", label: "Ouled Said - أولاد سعيد" },
    { value: "Reggane", label: "Reggane - رقان" },
    { value: "Sali", label: "Sali - سالي" },
    { value: "Sebaa", label: "Sebaa - سبع" },
    { value: "Talmine", label: "Talmine - طلمين" },
    { value: "Tamantit", label: "Tamantit - تمنطيط" },
    { value: "Tamekten", label: "Timekten - تيمقطن" },
    { value: "Tamest", label: "Tamest - تامست" },
    { value: "Timiaouine", label: "Timiaouine - تيمياوين" },
    { value: "Timimoun", label: "Timimoun - تيميمون" },
    { value: "Tinerkouk", label: "Tinerkouk - تينركوك" },
    { value: "Tit", label: "Tit - تيط" },
    { value: "Tsabit", label: "Tsabit - تسابيت" },
    { value: "Zaouiet Kounta", label: "Zaouiet Kounta - زاوية كنتة" },
  ]);
  const [formErr, setFormErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => console.log(communes), []);
  useEffect(() => {
    console.log("new wilaya:", province);
    const fetch = async () => {
      if (province !== "") {
        const getCommunes = await axios({
          url: `https://province-api.onrender.com/`,
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            wilaya: province,
          },
        });
        setCommunes(getCommunes.data.communes);
        console.log("the new communes: ", getCommunes.data);
      }
    };
    fetch();
  }, [province]);
  const Completionist = () => <span>You are good to go!</span>;
  const wilayas = [
    { value: "Adrar", label: "(1) Adrar - أدرار" },
    { value: "Chlef", label: "(2) Chlef - الشلف" },
    { value: "Laghouat", label: "(3) Laghouat - الأغواط" },
    { value: "Oum El Bouaghi", label: "(4) Oum El Bouaghi - أم البواقي" },
    { value: "Batna", label: "(5) Batna - باتنة" },
    { value: "Béjaïa", label: "(6) Bejaia - بجاية" },
    { value: "Biskra", label: "(7) Biskra - بسكرة" },
    { value: "Béchar", label: "(8) Bechar - بشار" },
    { value: "Blida", label: "(9) Blida - البليدة" },
    { value: "Bouira", label: "(10) Bouira - البويرة" },
    { value: "Tamanrasset", label: "(11) Tamanrasset - تامنغست" },
    { value: "Tébessa", label: "(12) Tebessa - تبسة" },
    { value: "Tlemcen", label: "(13) Tlemcen - تلمسان" },
    { value: "Tiaret", label: "(14) Tiaret - تيارت" },
    { value: "Tizi Ouzou", label: "(15) Tizi ouzou - تيزي وزو" },
    { value: "Alger", label: "(16) Alger - الجزائر" },
    { value: "Djelfa", label: "(17) Djelfa - الجلفة" },
    { value: "Jijel", label: "(18) Jijel - جيجل" },
    { value: "Sétif", label: "(19) Setif - سطيف" },
    { value: "Saïda", label: "(20) Saida - سعيدة" },
    { value: "Skikda", label: "(21) Skikda - سكيكدة" },
    { value: "Sidi Bel Abbès", label: "(22) Sidi Bel Abbes - سيدي بلعباس" },
    { value: "Annaba", label: "(23) Annaba - عنابة" },
    { value: "Guelma", label: "(24) Guelma - قالمة" },
    { value: "Constantine", label: "(25) Constantine - قسنطينة" },
    { value: "Médéa", label: "(26) Medea - المدية" },
    { value: "Mostaganem", label: "(27) Mostaganem - مستغانم" },
    { value: "M'Sila", label: "(28) M'sila - المسيلة" },
    { value: "Mascara", label: "(29) Mascara - معسكر" },
    { value: "Ouargla", label: "(30) Ouargla - ورقلة" },
    { value: "Oran", label: "(31) Oran - وهران" },
    { value: "El Bayadh", label: "(32) El Bayadh - البيض" },
    { value: "Illizi (wilaya restreinte)", label: "(33) Illizi - إيليزي" },
    {
      value: "Bordj Bou Arreridj",
      label: "(34) Bordj Bou Arreridj - برج بوعريرج",
    },
    { value: "Boumerdès", label: "(35) Boumerdes - بومرداس" },
    { value: "El Tarf", label: "(36) El Tarf - الطارف" },
    { value: "Tindouf (wilaya restreinte)", label: "(37) Tindouf - تندوف" },
    { value: "Tissemsilt", label: "(38) Tissemsilt - تيسمسيلت" },
    { value: "El Oued", label: "(39) El Oued - الوادي" },
    { value: "Khenchela", label: "(40) Khenchela - خنشلة" },
    { value: "Souk Ahras", label: "(41) Souk Ahras - سوق أهراس" },
    { value: "Tipaza", label: "(42) Tipaza - تيبازة" },
    { value: "Mila", label: "(43) Mila - ميلة" },
    { value: "Aïn Defla", label: "(44) Ain Defla - عين الدفلة" },
    { value: "Naâma", label: "(45) Naama - النعامة" },
    { value: "Aïn Témouchent", label: "(46) Ain Temouchent - عين تيموشنت" },
    { value: "Ghardaïa", label: "(47) Ghardaia - غرداية" },
    { value: "Relizane", label: "(48) Relizane - غليزان" },
  ];
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="w-full flex justify-center">
          <span className="flex mt-4">
            <span>
              <span className="h-16 mr-1 rounded-tl-md rounded-tr-md w-16 flex justify-center items-center bg-red-600 text-white text-5xl">
                {days}
              </span>
              <span className="w-16 flex rounded-bl-md rounded-br-md justify-center bg-white">
                أيام
              </span>
            </span>
            <span>
              <span className="h-16 mr-1 rounded-tl-md rounded-tr-md w-16 flex justify-center items-center bg-red-600 text-white text-5xl">
                {hours}
              </span>
              <span className="w-16 flex rounded-bl-md rounded-br-md justify-center bg-white">
                ساعة
              </span>
            </span>
            <span>
              <span className="h-16 mr-1 rounded-tl-md rounded-tr-md w-16 flex justify-center items-center bg-red-600 text-white text-5xl">
                {minutes}
              </span>
              <span className="w-16 flex rounded-bl-md rounded-br-md justify-center bg-white">
                دقيقة
              </span>
            </span>
            <span>
              <span className="h-16 mr-1 rounded-tl-md rounded-tr-md w-16 flex justify-center items-center bg-red-600 text-white text-5xl">
                {seconds}
              </span>
              <span className="w-16 flex rounded-bl-md rounded-br-md justify-center bg-white">
                ثانية
              </span>
            </span>
          </span>
        </div>
      );
    }
  };

  const handleAddLead = async (e: any) => {
    e.preventDefault();
    if (fullName !== "" && province !== "" && commune !== "" && number !== "") {
      try {
        setIsLoading(true);
        const leadsRef = collection(db, "leads");
        const offerValue = offer === 2 ? "oil + champoing" : "oil";
        setFormErr(false);
        await addDoc(leadsRef, {
          fullName,
          commune,
          province,
          number,
          timestamp: serverTimestamp(),
          version: 2.0,
        });

        router.push("/thankyou");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormErr(true);
    }
  };

  const handleSetError = (field: string) => {
    if (field == "name") {
      if (fullName === "") {
        setNameErr(true);
      } else {
        setNameErr(false);
      }
    } else if (field === "number") {
      if (number === "") {
        setNumberErr(true);
      } else {
        setNumberErr(false);
      }
    } else if (field === "province") {
      if (province === "") {
        setProvinceErr(true);
      } else {
        setProvinceErr(false);
      }
    } else if (field === "commune") {
      if (commune === "") {
        setCommuneErr(true);
      } else {
        setCommuneErr(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Agivahuile - beard oil</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="facebook-domain-verification"
          content="0vk93c3g54k368ks9wwwse3tdnxtow"
        />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <div
        className="bg-auto bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${bg.src})`,
          // backgroundSize: "100%",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          backgroundColor: "#333",
          backgroundBlendMode: "overlay",
        }}
      >
        <header className="bg-black fixed top-0 h-20 w-full">
          <div className="w-full flex justify-between px-3 py-3">
            <div className="py-3">
              <img src="logo.avif" className="h-8" alt="" />
            </div>
            <div className=" mt-3">
              <a
                href="#form"
                className="text-white bg-red-700 px-6 py-3 rounded-lg font-bold"
              >
                أطلب الآن
              </a>
            </div>
          </div>
        </header>
        <main className="w-full  mt-20 px-6">
          <div className="w-full pt-4 pb-8 text-center text-white z-10 mt-4">
            <h1 className="text-5xl mb-2">
              أحصل على لحية مميزة في أسابيع قليلة
            </h1>
            <h6 className="text-2xl">
              الزيت الأصلي من شركة أجيفا العالمية الذي يساعد على تعزيز نمو شعر
              اللحية بشكل صحي وملئ الفراغات
            </h6>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="w-full hidden md:block">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/sCT5THD_Qiw"
                className="w-full  rounded-2xl overflow-hidden mb-4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="text-white text-right mt-4">
                <h1 className="text-xl mb-2">
                  هل تعاني من الفرغات في اللحية ؟ او تريد الحصول على لحية مميزة؟
                </h1>
                <p>
                  نقدم لكم الزيت الأصلي من شركة أجيفا العالمية الذي يساعد على
                  تعزيز نمو شعر اللحية بشكل صحي وملئ الفراغات خصوصا الأشخاص
                  للذين يعانون من فراغات اللحية كما انه يساعد على نمو اسرع ب 5
                  اضعاف والحفاظ على لمعان شعر اللحية
                </p>
              </div>
              <div className="text-white text-right mt-8">
                <h1 className="text-xl mb-2">
                  :زيت اللحية لأجيفا يتكون من 4 زيوت{" "}
                </h1>
                <div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> زيت الأرغان يغدي اللحية</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      1
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> زيت اللوز يقوي من شعر اللحية</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      2
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> زيت الجوجوبا يرطب اللحية</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      3
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> زيت جوز الهند يساعد على لمعان شعر اللحية</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      4
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between hidden">
                <Image
                  src="/arrowdown.png"
                  width={72}
                  height={72}
                  alt=""
                  className="-scale-x-100"
                />
                <Image src="/arrowdown.png" width={72} height={72} alt="" />
              </div>
              <div
                className="bg-[#1f1f1f] rounded-2xl border-2 py-4 px-6 border-[#dc111f]"
                id="form"
              >
                <h1 className="text-3xl text-white font-bold text-center">
                  <span className="text-red-500">(30% PROMO)</span> <br />
                  أطلب الآن واستفد من عرض بداية السنة{" "}
                </h1>

                <div className="  my-4 py-4 rounded-lg bg-white/5">
                  <h1 className="text-2xl text-red-500 text-center">
                    العرض ينتهي خلال
                  </h1>
                  <Countdown
                    date={new Date("2023-02-05T00:00:00")}
                    renderer={renderer}
                  />
                </div>
                <h3 className="text-lg text-white text-center">
                  للطلب يرجى ملء هذا النموذج وسوف نتصل بك للتاكيد{" "}
                </h3>
                <form action="#" method="post">
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text text-white right-0">
                        الإسم و اللقب
                      </span>
                    </label>
                    <input
                      type="text"
                      className="p-3 mt-2 bg-white rounded-md w-full text-right"
                      placeholder="الإسم و اللقب"
                      value={fullName}
                      onBlur={() => handleSetError("name")}
                      required
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {nameErr && (
                      <p className="text-right text-red-600">ادخل الاسم</p>
                    )}
                  </div>
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text text-white">رقم الهاتف</span>
                    </label>
                    <input
                      type="number"
                      className="p-3 mt-2 bg-white rounded-md w-full  text-right"
                      placeholder="رقم الهاتف"
                      value={number}
                      onBlur={() => handleSetError("number")}
                      required
                      onChange={(e) => setNumber(e.target.value)}
                    />
                    {numberErr && (
                      <p className="text-right text-red-600">
                        الرجاء إدخال رقم الهاتف
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text text-white">الولاية</span>
                    </label>

                    <select
                      value={province}
                      className="p-3 mt-2 bg-white rounded-md w-full text-right"
                      onBlur={() => handleSetError("province")}
                      onChange={(e) => {
                        setProvince(e.target.value);
                      }}
                      required
                    >
                      <option value="">
                        ---------- إختر الولاية -----------
                      </option>
                      {wilayas.map((wil: any, key: any) => (
                        <option key={key} value={wil.value}>
                          {wil.label}
                        </option>
                      ))}
                    </select>
                    {provinceErr && (
                      <p className="text-right text-red-600">
                        الرجاء إدخال الولاية
                      </p>
                    )}
                  </div>
                  {province !== "" && (
                    <div>
                      <label className="label w-full text-right block mt-3">
                        <span className="label-text text-white">البلدية</span>
                      </label>

                      <select
                        value={commune}
                        className="p-3 mt-2 bg-white rounded-md w-full text-right"
                        onBlur={() => handleSetError("commune")}
                        onChange={(e) => {
                          setCommune(e.target.value);
                        }}
                        required
                      >
                        <option value="">
                          ---------- إختر البلدية -----------
                        </option>
                        {communes.map((com: any, key: any) => (
                          <option key={key} value={com.value}>
                            {com.label}
                          </option>
                        ))}
                      </select>
                      {communeErr && (
                        <p className="text-right text-red-600">
                          الرجاء إدخال البلدية
                        </p>
                      )}
                    </div>
                  )}

                  {/* <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text text-white">العنوان</span>
                    </label>
                    <input
                      type="text"
                      className="p-3 mt-2 bg-white rounded-md w-full text-right"
                      placeholder="العنوان"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div> */}

                  <div>
                    <div>
                      <div className="">
                        <p className="text-white mr-3 my-6 text-lg text-center">
                          30% تخفيض
                        </p>
                        <p className="sm:flex block text-center justify-center">
                          <span className="text-6xl text-green-500 font-bold  block sm:inline">
                            3100 DA
                          </span>
                          <span className="text-gray-50 text-lg line-through block sm:inline">
                            4450 DA
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {formErr && (
                      <p className="text-center text-white bg-red-600/60 py-3 rounded-lg mt-4">
                        الرجاء إدخال جميع المعلومات
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      // disabled={!fullName || !number || !province}
                      onClick={handleAddLead}
                      disabled={isLoading}
                      type="submit"
                      className="bg-[#dc111f] button-bounce text-2xl rounded-lg w-full p-4 text-center text-white font-bold hover:bg-[#cf0c19]"
                    >
                      {isLoading && <span className="loader"></span>}أطلب الآن
                    </button>
                  </div>
                </form>
              </div>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/sCT5THD_Qiw"
                className="w-full  rounded-2xl overflow-hidden md:hidden mt-4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="w-full block md:hidden">
              {/* <iframe
                // width="560"
                height="315"
                className="w-full  rounded-2xl overflow-hidden"
                src="https://www.youtube.com/embed/cB2vnyM5sEM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> */}
              <div className="text-white text-right mt-4">
                <h1 className="text-xl mb-2">
                  هل تعاني من الفرغات في اللحية ؟ او تريد الحصول على لحية مميزة؟
                </h1>
                <p>
                  نقدم لكم الزيت الأصلي من شركة أجيفا العالمية الذي يساعد على
                  تعزيز نمو شعر اللحية بشكل صحي وملئ الفراغات خصوصا الأشخاص
                  للذين يعانون من فراغات اللحية كما انه يساعد على نمو اسرع ب 5
                  اضعاف والحفاظ على لمعان شعر اللحية
                </p>
              </div>
              <div className="text-white text-right mt-8">
                <h1 className="text-xl mb-2">
                  :زيت اللحية لأجيفا يتكون من 4 زيوت{" "}
                </h1>
                <div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> زيت الأرغان يغدي اللحية</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      1
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> زيت اللوز يقوي من شعر اللحية</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      2
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> زيت الجوجوبا يرطب اللحية</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      3
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> زيت جوز الهند يساعد على لمعان شعر اللحية</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      4
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end my-6">
                <img src="testm.jpg" />
              </div>
              <div className="text-white text-right mt-8 mb-6">
                <h1 className="text-xl mb-2">:طريقة الإستعمال </h1>
                <div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> تغسل اللحية جيدا بالماء والغسول</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      1
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> تقوم بتجفيفها جيدا من الماء</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      2
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span>
                      {" "}
                      تضع قطرات من زيت أجيفا ثم تقوم بتدليك اللحية جيدا لمدة 2
                      دقيقة
                    </span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      3
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span>
                      {" "}
                      تقوم بتكرير العملية يوميا والمداومة عليها لتظهر النتيجة في
                      وقت قصير
                    </span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      4
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div></div>
        </main>
      </div>
    </>
  );
}
