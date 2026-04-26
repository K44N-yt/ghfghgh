import { Theme, Module, MoleculeData } from "../types/curriculum";
import { molecules } from "./molecules";

const moleculeList = Object.values(molecules);

const generateMoleculeQuiz = () => {
  return moleculeList.map((correctMol) => {
    // Pick 3 random wrong molecules
    const wrongMols = moleculeList
      .filter((m) => m.name !== correctMol.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [correctMol, ...wrongMols].sort(() => 0.5 - Math.random());
    const answerIndex = options.findIndex((m) => m.name === correctMol.name);

    return {
      id: `q_${correctMol.name}`,
      q: `Aşağıdaki 3 boyutlu modellerden hangisi ${correctMol.name} (${correctMol.formula}) molekülüne aittir?`,
      optionType: "molecule" as const,
      moleculeOptions: options,
      answer: answerIndex,
    };
  });
};

export const curriculum: Theme[] = [
  {
    id: "tema1",
    title: "1. TEMA: ETKİLEŞİM",
    description: "Kimyasal değişimler ve göstergeleri.",
    order: 1,
    modules: [
      {
        id: "t1_m1",
        title: "Maddeyi Sınıflandır",
        description:
          "Tanecik modellerine bakarak maddelerin element, bileşik veya karışım olduğuna karar verin.",
        type: "classification",
        classifications: [
          {
            id: "c1",
            title: "Madde Sınıflandırma",
            description: "Tanecik modellerini inceleyin.",
            options: [
              {
                id: "element",
                label: "Element",
                colorClass: "hover:border-cyan-500 hover:text-cyan-400",
              },
              {
                id: "compound",
                label: "Bileşik",
                colorClass: "hover:border-emerald-500 hover:text-emerald-400",
              },
              {
                id: "mixture",
                label: "Karışım",
                colorClass: "hover:border-amber-500 hover:text-amber-400",
              },
            ],
            items: [
              {
                id: "i1",
                molecule: molecules.h2o,
                correctType: "compound",
                explanation:
                  "Farklı cins atomlar (H ve O) belirli oranda birleşerek yeni bir saf madde oluşturmuştur.",
              },
              {
                id: "i2",
                molecule: molecules.n2,
                correctType: "element",
                explanation:
                  "Aynı cins atomlardan (sadece Azot) oluşan saf maddedir.",
              },
              {
                id: "i3",
                molecule: molecules.he,
                correctType: "element",
                explanation:
                  "Aynı cins atomlardan oluşan tek atomlu (monatomik) elementtir.",
              },
              {
                id: "i4",
                molecule: molecules.mixture_air,
                correctType: "mixture",
                explanation:
                  "Farklı cins moleküller (N₂ ve O₂) kimyasal bağ kurmadan bir aradadır.",
              },
              {
                id: "i5",
                molecule: molecules.co2,
                correctType: "compound",
                explanation:
                  "Karbon ve Oksijen atomları kimyasal bağ ile birleşerek bileşik oluşturmuştur.",
              },
              {
                id: "i6",
                molecule: molecules.mixture_salt_water,
                correctType: "mixture",
                explanation:
                  "Su molekülleri ve tuz iyonları (Na⁺, Cl⁻) bir arada bulunur, kimyasal olarak birleşmemişlerdir.",
              },
            ],
          },
        ],
      },
      {
        id: "t1_m1_2",
        title: "Atom, Molekül, İyon",
        description:
          "Tanecik modellerine bakarak maddenin atom, molekül veya iyon olduğuna karar verin.",
        type: "classification",
        classifications: [
          {
            id: "c2",
            title: "Tanecik Türünü Belirle",
            description: "Tanecik modellerini inceleyin.",
            options: [
              {
                id: "atom",
                label: "Atom",
                colorClass: "hover:border-blue-500 hover:text-blue-400",
              },
              {
                id: "molecule",
                label: "Molekül",
                colorClass: "hover:border-purple-500 hover:text-purple-400",
              },
              {
                id: "ion",
                label: "İyon",
                colorClass: "hover:border-pink-500 hover:text-pink-400",
              },
            ],
            items: [
              {
                id: "i1",
                molecule: molecules.atom_he,
                correctType: "atom",
                explanation:
                  "Tek bir çekirdek etrafında bulunan elektronlardan oluşan, kimyasal bağ yapmamış tekil taneciktir.",
              },
              {
                id: "i2",
                molecule: molecules.h2o,
                correctType: "molecule",
                explanation:
                  "Birden fazla atomun kovalent bağ ile birleşerek oluşturduğu bağımsız tanecik grubudur.",
              },
              {
                id: "i3",
                molecule: molecules.ion_na,
                correctType: "ion",
                explanation:
                  "Elektron vermiş veya almış, elektrik yüklü taneciktir (Na⁺).",
              },
              {
                id: "i4",
                molecule: molecules.o2,
                correctType: "molecule",
                explanation:
                  "Aynı cins iki atomun kovalent bağ ile birleştiği bir element molekülüdür.",
              },
              {
                id: "i5",
                molecule: molecules.atom_c,
                correctType: "atom",
                explanation: "Tekil bir karbon atomudur.",
              },
              {
                id: "i6",
                molecule: molecules.ion_cl,
                correctType: "ion",
                explanation:
                  "Elektron alarak eksi (-) yükle yüklenmiş bir iyondur (Cl⁻).",
              },
            ],
          },
        ],
      },
      {
        id: "t1_m2",
        title: "Kimyasal Değişimin Göstergeleri",
        description:
          "Kimyasal değişimlerin göstergelerini keşfet ve soruları yanıtla.",
        type: "mindmap",
        mindmapNodes: [
          {
            id: "renk",
            label: "Renk değişimi",
            color: "bg-red-500",
            question: {
              text: "Aşağıdaki olaylardan hangisi renk değişiminin kimyasal bir tepkimeye işaret ettiğine örnektir?",
              options: [
                {
                  text: "Kesilen elmanın kararması",
                  isCorrect: true,
                  svgId: "apple_brown",
                },
                {
                  text: "Suya mürekkep damlatılması",
                  isCorrect: false,
                  svgId: "ink_water",
                },
              ],
            },
          },
          {
            id: "gaz",
            label: "Gaz çıkışı",
            color: "bg-blue-500",
            question: {
              text: "Hangi görseldeki gaz çıkışı kimyasal bir değişimin sonucudur?",
              options: [
                {
                  text: "Suyun kaynaması",
                  isCorrect: false,
                  svgId: "boiling_water",
                },
                {
                  text: "Karbonata limon sıkılması",
                  isCorrect: true,
                  svgId: "lemon_baking_soda",
                },
              ],
            },
          },
          {
            id: "kati",
            label: "Katı oluşumu",
            color: "bg-orange-400",
            question: {
              text: "İki sıvı karıştırıldığında katı oluşumu (çökelme) kimyasal değişime kanıttır. Hangisi buna örnektir?",
              options: [
                {
                  text: "Sütten peynir eldesi",
                  isCorrect: true,
                  svgId: "cheese_making",
                },
                {
                  text: "Suyun donarak buza dönüşmesi",
                  isCorrect: false,
                  svgId: "ice_melting",
                },
              ],
            },
          },
          {
            id: "isi_isik",
            label: "Işık oluşumu",
            color: "bg-yellow-500",
            question: {
              text: "Hangi olayda açığa çıkan ışık kimyasal bir tepkimenin göstergesidir?",
              options: [
                {
                  text: "Ampulün yanması",
                  isCorrect: false,
                  svgId: "lightbulb",
                },
                {
                  text: "Odunun yanması",
                  isCorrect: true,
                  svgId: "burning_wood",
                },
              ],
            },
          },
          {
            id: "koku",
            label: "Koku değişimi",
            color: "bg-teal-500",
            question: {
              text: "Koku değişimi hangi durumda kimyasal bir değişimi gösterir?",
              options: [
                {
                  text: "Yemeğin bozulması (ekşimesi)",
                  isCorrect: true,
                  svgId: "spoiled_food",
                },
                {
                  text: "Odanın parfüm kokması",
                  isCorrect: false,
                  svgId: "perfume",
                },
              ],
            },
          },
          {
            id: "enerji",
            label: "Enerji değişimi",
            color: "bg-emerald-500",
            question: {
              text: "Kimyasal tepkimelerde enerji (ısı) değişimi gözlenir. Hangisi kimyasal bir ısı değişimidir?",
              options: [
                {
                  text: "Havai fişek patlaması",
                  isCorrect: true,
                  svgId: "fireworks",
                },
                {
                  text: "Buzun erimesi",
                  isCorrect: false,
                  svgId: "ice_melting",
                },
              ],
            },
          },
        ],
      },
      {
        id: "t1_m3",
        title: "Etkileşim Türleri",
        description:
          "Kimyasal türler arası etkileşim türlerini temel sınıflarına göre eşleştirin.",
        type: "matching",
        pairs: [
          { left: "İyonik Bağ", right: "Güçlü Etkileşim", rightType: "text" },
          {
            left: "Kovalent Bağ",
            right: "Güçlü Etkileşim ",
            rightType: "text",
          },
          {
            left: "Metalik Bağ",
            right: "Güçlü Etkileşim  ",
            rightType: "text",
          },
          {
            left: "Hidrojen Bağı",
            right: "Zayıf Etkileşim",
            rightType: "text",
          },
          {
            left: "Van der Waals Etkileşimleri",
            right: "Zayıf Etkileşim ",
            rightType: "text",
          },
        ],
      },
      {
        id: "t1_m4",
        title: "Fiziksel ve Kimyasal Değişimler",
        description:
          "Günlük hayattaki olayların fiziksel mi yoksa kimyasal değişim mi olduğunu eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Buzun erimesi",
            right: "Fiziksel Değişim",
            rightType: "text",
          },
          {
            left: "Demirin paslanması",
            right: "Kimyasal Değişim",
            rightType: "text",
          },
          {
            left: "Sütten yoğurt elde edilmesi",
            right: "Kimyasal Değişim ",
            rightType: "text",
          },
          {
            left: "Camın kırılması",
            right: "Fiziksel Değişim ",
            rightType: "text",
          },
          {
            left: "Gümüşün kararması",
            right: "Kimyasal Değişim  ",
            rightType: "text",
          },
          {
            left: "Şekerin suda çözünmesi",
            right: "Fiziksel Değişim  ",
            rightType: "text",
          },
        ],
      },
      {
        id: "t1_m5",
        title: "Laboratuvar Malzemeleri",
        description:
          "Temel kimya laboratuvar malzemelerinin isimlerini kullanımlarıyla eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Sıvıların hacmini hassas ölçmek için",
            right: "Mezür (Dereceli Silindir)",
            rightType: "text",
          },
          {
            left: "Çözelti hazırlamak ve saklamak için",
            right: "Balon Joje",
            rightType: "text",
          },
          {
            left: "Titrasyon işlemlerinde sıvı damlatmak için",
            right: "Büret",
            rightType: "text",
          },
          {
            left: "Sıvıları ısıtmak ve kaynatmak için",
            right: "Beherglas",
            rightType: "text",
          },
          {
            left: "Az miktardaki sıvıları ısıtmak için",
            right: "Deney Tüpü",
            rightType: "text",
          },
        ],
      },
      {
        id: "t1_m6",
        title: "Kimya Disiplinleri",
        description:
          "Kimyanın alt bilim dallarını ilgilendikleri çalışma alanlarıyla eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Maddenin kimyasal bileşimini nitel ve nicel analiz eder",
            right: "Analitik Kimya",
            rightType: "text",
          },
          {
            left: "Canlı organizmalardaki kimyasal süreçleri inceler",
            right: "Biyokimya",
            rightType: "text",
          },
          {
            left: "Karbon bileşiklerinin yapısını ve tepkimelerini inceler",
            right: "Organik Kimya",
            rightType: "text",
          },
          {
            left: "Karbon dışındaki mineraller ve metallerle ilgilenir",
            right: "Anorganik Kimya",
            rightType: "text",
          },
          {
            left: "Kimyasal tepkimelerdeki ısı, iş ve enerji ilişkilerini inceler",
            right: "Fizikokimya",
            rightType: "text",
          },
        ],
      },
      {
        id: "t1_mz_1",
        title: "Labirent 1: Fiziksel Değişimler",
        description:
          "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [
          {
            id: "mg_t1_mz_1",
            title: "Labirent 1: Fiziksel Değişimler",
            description: "Robot ile kaç!",
            questions: [
              {
                id: "q1",
                questionText: "Seviye 1: Sütün ekşimesi ne tür bir değişimdir?",
                options: [
                  {
                    id: "3",
                    text: "Pıhtılaşma",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Buharlaşma",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q2",
                questionText:
                  "Seviye 2: Fotosentez olayı ne tür bir değişimdir?",
                options: [
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Sadece Biyolojik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Optik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q3",
                questionText:
                  "Seviye 3: Yaprağın sararması ne tür bir değişimdir?",
                options: [
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Mekanik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Çözünme",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q4",
                questionText:
                  "Seviye 4: Patatesin soyulması hangi değişime örnektir?",
                options: [
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Botanik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Enzimatik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q5",
                questionText: "Seviye 5: Yemeğin pişmesi hangi değişime girer?",
                options: [
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Termik",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Isısal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q6",
                questionText:
                  "Seviye 6: Demirin tel ve levha haline getirilmesi hangi değişimdir?",
                options: [
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Metalik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q7",
                questionText:
                  "Seviye 7: Odunun yanması hangi değişime bir örnektir?",
                options: [
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Bozunma",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Hücresel",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q8",
                questionText:
                  "Seviye 8: Şekerin çayda çözünmesi ne tür bir değişimdir?",
                options: [
                  {
                    id: "4",
                    text: "Enzimatik",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Karışım-Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q9",
                questionText:
                  "Seviye 9: Gümüşün kararması ne tür bir değişimdir?",
                options: [
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Biyolojik",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Fizikokimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q10",
                questionText:
                  "Seviye 10: Demirin paslanması ne tür bir değişimdir?",
                options: [
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Hal Değişimi",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q11",
                questionText:
                  "Seviye 11: Tuzun suda çözünmesi genel olarak ne tür değişime örnektir?",
                options: [
                  {
                    id: "3",
                    text: "Parçalanma",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q12",
                questionText:
                  "Seviye 12: Kömürün toz haline getirilmesi hangi değişime örnektir?",
                options: [
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Mekanik-Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q13",
                questionText:
                  "Seviye 13: Saçın kesilmesi ne tür bir değişimdir?",
                options: [
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Biyolojik",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Genetik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q14",
                questionText: "Seviye 14: Mumun erimesi ne tür bir değişimdir?",
                options: [
                  {
                    id: "3",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Bozunma",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q15",
                questionText:
                  "Seviye 15: Zeytinyağı ve suyun emülsiyonu nasıl bir süreçtir?",
                options: [
                  {
                    id: "4",
                    text: "Tepkime",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Biyolojik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q16",
                questionText:
                  "Seviye 16: Elmanın çürümesi ne tür bir değişimdir?",
                options: [
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Yüzeysel",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Mekanik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q17",
                questionText:
                  "Seviye 17: Camın kırılması hangi değişime girer?",
                options: [
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Plazmatik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Biyolojik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q18",
                questionText:
                  "Seviye 18: Hamurun mayalanması hangi değişime örnektir?",
                options: [
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Hal Değişimi",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Mekanik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q19",
                questionText:
                  "Seviye 19: Ekmeğin sindirilmesi ne tür bir değişimdir?",
                options: [
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Mekanik",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Hal Değişimi",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q20",
                questionText:
                  "Seviye 20: Suyun donması hangi değişime örnektir?",
                options: [
                  {
                    id: "3",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Bozunma",
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: "t1_mz_2",
        title: "Labirent 2: Kimyasal Değişimler+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [
          {
            id: "mg_t1_mz_2",
            title: "Labirent 2: Kimyasal Değişimler+",
            description: "Robot ile kaç!",
            questions: [
              {
                id: "q1",
                questionText: "Seviye 1: Camın kırılması hangi değişime girer?",
                options: [
                  {
                    id: "4",
                    text: "Plazmatik",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Biyolojik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q2",
                questionText:
                  "Seviye 2: Elmanın çürümesi ne tür bir değişimdir?",
                options: [
                  {
                    id: "3",
                    text: "Mekanik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Yüzeysel",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q3",
                questionText:
                  "Seviye 3: Demirin tel ve levha haline getirilmesi hangi değişimdir?",
                options: [
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Metalik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q4",
                questionText:
                  "Seviye 4: Hamurun mayalanması hangi değişime örnektir?",
                options: [
                  {
                    id: "4",
                    text: "Mekanik",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Hal Değişimi",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q5",
                questionText:
                  "Seviye 5: Fotosentez olayı ne tür bir değişimdir?",
                options: [
                  {
                    id: "4",
                    text: "Optik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Sadece Biyolojik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q6",
                questionText:
                  "Seviye 6: Patatesin soyulması hangi değişime örnektir?",
                options: [
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Botanik",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Enzimatik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q7",
                questionText:
                  "Seviye 7: Kömürün toz haline getirilmesi hangi değişime örnektir?",
                options: [
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Mekanik-Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Yanma",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q8",
                questionText:
                  "Seviye 8: Zeytinyağı ve suyun emülsiyonu nasıl bir süreçtir?",
                options: [
                  {
                    id: "3",
                    text: "Biyolojik",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Tepkime",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q9",
                questionText: "Seviye 9: Sütün ekşimesi ne tür bir değişimdir?",
                options: [
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Pıhtılaşma",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Buharlaşma",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q10",
                questionText:
                  "Seviye 10: Yaprağın sararması ne tür bir değişimdir?",
                options: [
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Çözünme",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Mekanik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q11",
                questionText:
                  "Seviye 11: Kağıdın yırtılması ne tür bir değişimdir?",
                options: [
                  {
                    id: "3",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Biyolojik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q12",
                questionText:
                  "Seviye 12: Odunun yanması hangi değişime bir örnektir?",
                options: [
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Hücresel",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Bozunma",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q13",
                questionText:
                  "Seviye 13: Suyun donması hangi değişime örnektir?",
                options: [
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Bozunma",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q14",
                questionText: "Seviye 14: Mumun erimesi ne tür bir değişimdir?",
                options: [
                  {
                    id: "4",
                    text: "Bozunma",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q15",
                questionText:
                  "Seviye 15: Tuzun suda çözünmesi genel olarak ne tür değişime örnektir?",
                options: [
                  {
                    id: "4",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Parçalanma",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q16",
                questionText:
                  "Seviye 16: Demirin paslanması ne tür bir değişimdir?",
                options: [
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Nükleer",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Hal Değişimi",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q17",
                questionText:
                  "Seviye 17: Gümüşün kararması ne tür bir değişimdir?",
                options: [
                  {
                    id: "4",
                    text: "Biyolojik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Fizikokimyasal",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q18",
                questionText:
                  "Seviye 18: Yemeğin pişmesi hangi değişime girer?",
                options: [
                  {
                    id: "2",
                    text: "Fiziksel",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Termik",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Isısal",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kimyasal",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q19",
                questionText:
                  "Seviye 19: Yoğurttan ayran yapılması ne tür bir değişimdir?",
                options: [
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Biyolojik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Mayalanma",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q20",
                questionText:
                  "Seviye 20: Şekerin çayda çözünmesi ne tür bir değişimdir?",
                options: [
                  {
                    id: "1",
                    text: "Fiziksel",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Karışım-Kimyasal",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Enzimatik",
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tema2",
    title: "2. TEMA: MADDENİN HALLERİ",
    description: "Katı, sıvı, gaz ve plazma halleri ile hal değişimleri.",
    order: 2,
    modules: [
      {
        id: "t2_m1",
        title: "Maddenin Halleri Dersi",
        description: "Katı, sıvı, gaz ve plazma hallerinin özellikleri.",
        type: "lesson",
        blocks: [
          {
            id: "b1",
            type: "text",
            text: "Maddenin 4 temel hali vardır: Katı, Sıvı, Gaz, Plazma.",
          },
        ],
      },
      {
        id: "t2_qz_1",
        title: "Hal Değişimleri Testi",
        description: "Hal değişimleri üzerine 10 soruluk test.",
        type: "quiz",
        questions: [
          { id: "1", q: "Hangi hal?", options: ["Katı", "Sıvı"], answer: 0 },
        ],
      },
    ],
  },
  {
    id: "tema3",
    title: "3. TEMA: KİMYASAL TEPKİMELER",
    description: "Kimyasal tepkimeleri modelleme ve denkleştirme.",
    order: 3,
    modules: [
      {
        id: "t3_mz_1",
        title: "Labirent 1: Tepkime Türleri",
        description:
          "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [
          {
            id: "mg_t3_mz_1",
            title: "Labirent 1: Tepkime Türleri",
            description: "Robot ile kaç!",
            questions: [
              {
                id: "q1",
                questionText:
                  "Seviye 1: Tepkimeye giren maddelerin kütleleri toplamı ürünlerin kütleleri toplamına eşittir diyen kanun?",
                options: [
                  {
                    id: "4",
                    text: "Hacim Korunumu",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kütlenin Korunumu",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Katlı Oranlar",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Sabit Oranlar",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q2",
                questionText:
                  "Seviye 2: CH4 + 2O2 -> CO2 + 2H2O ne tür bir tepkimedir?",
                options: [
                  {
                    id: "4",
                    text: "Redoks olmayan",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Yanma",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Sentez",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Nötralleşme",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q3",
                questionText:
                  "Seviye 3: Kimyasal tepkimelerde hangi zerreceklerin alışverişi bağ kopması ve oluşumunu sağlar?",
                options: [
                  {
                    id: "3",
                    text: "Nötron",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Proton",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Elektron",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Çekirdek",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q4",
                questionText:
                  "Seviye 4: Endotermik tepkimeler gerçekleşirken ortamdan ne alırlar?",
                options: [
                  {
                    id: "4",
                    text: "Kütle",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Işık",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Isı",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Basınç",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q5",
                questionText:
                  "Seviye 5: Maddelerin oksijen gazı ile tepkimeye girdiği durumlara ne denir?",
                options: [
                  {
                    id: "1",
                    text: "Yanma",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Bozunma",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Sentez",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Nötralleşme",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q6",
                questionText:
                  "Seviye 6: CaCO3 -> CaO + CO2 ne tür bir tepkimedir?",
                options: [
                  {
                    id: "3",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Analiz",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Redoks",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Sentez",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q7",
                questionText:
                  "Seviye 7: Tepkime okunun solundaki maddelere ne ad verilir?",
                options: [
                  {
                    id: "3",
                    text: "Meydana Gelenler",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Sonuçlar",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Girenler",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Ürünler",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q8",
                questionText:
                  "Seviye 8: Nötralleşme tepkimelerinde net iyon denklemi neyin oluşumunu gösterir?",
                options: [
                  {
                    id: "2",
                    text: "Tuz (NaCl)",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Çökelek",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Su (H2O)",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Gaz çıkışı",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q9",
                questionText:
                  "Seviye 9: Asit ve bazın tepkimeye girerek tuz ve su oluşturduğu tepkimeler?",
                options: [
                  {
                    id: "2",
                    text: "Sentez",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Çökelme",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Nötralleşme",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Analiz",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q10",
                questionText:
                  "Seviye 10: Metalin asitle verdiği tepkime sonucunda genellikle hangi gaz çıkar?",
                options: [
                  {
                    id: "1",
                    text: "H2",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "CO2",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "O2",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "NO2",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q11",
                questionText:
                  "Seviye 11: İki veya daha fazla maddenin birleşerek tek bir madde oluşturduğu tepkime?",
                options: [
                  {
                    id: "3",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Sentez",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Analiz",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Asit-Baz",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q12",
                questionText:
                  "Seviye 12: Yanma tepkimeleri genellikle ne tür tepkimelerdir?",
                options: [
                  {
                    id: "2",
                    text: "Endotermik",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "İzotermik",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Atermik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Ekzotermik",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q13",
                questionText:
                  "Seviye 13: Bir kimyasal denklemi denkleştirirken ne tür sayılar formüllerin başına yazılır?",
                options: [
                  {
                    id: "4",
                    text: "Yük",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Alt İndis",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Katsayı",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Üst İndis",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q14",
                questionText:
                  "Seviye 14: Bir bileşiğin daha basit maddelere ayrıştığı tepkime türü hangisidir?",
                options: [
                  {
                    id: "2",
                    text: "Sentez",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Analiz (Bozunma)",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Çökelme",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q15",
                questionText:
                  "Seviye 15: İki sulu çözeltinin karışarak katı bir madde oluşturduğu tepkimeler?",
                options: [
                  {
                    id: "1",
                    text: "Çözünme-Çökelme",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Nötralleşme",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Sentez",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q16",
                questionText:
                  "Seviye 16: Gümüş nitrat ile potasyum iyodür sulu çözeltileri karışınca Gümüş İyodür katısı ne olur?",
                options: [
                  {
                    id: "2",
                    text: "Buharlaşır",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Süblimleşir",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Yanar",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Çöker",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q17",
                questionText:
                  "Seviye 17: H2 + 1/2 O2 -> H2O ne tür bir tepkimedir?",
                options: [
                  {
                    id: "1",
                    text: "Sentez",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Çökelme",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Nötralleşme",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Analiz",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q18",
                questionText:
                  "Seviye 18: HCl + NaOH -> NaCl + H2O ne tür bir tepkimedir?",
                options: [
                  {
                    id: "4",
                    text: "Analiz",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Çökelme",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Asit-Baz",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q19",
                questionText: "Seviye 19: Lavoisier hangi kanunu bulmuştur?",
                options: [
                  {
                    id: "3",
                    text: "Sabit Oranlar",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kütlenin Kor.",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Katlı Oranlar",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Avogadro Yasası",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q20",
                questionText:
                  "Seviye 20: Fotosentez gerçekleşirken enerji olarak güneş ışığı alınır. Bu nedenle...",
                options: [
                  {
                    id: "4",
                    text: "Bozunmadır",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Endotermiktir",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Ekzotermiktir",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Yanmadır",
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "t3_mz_2",
        title: "Labirent 2: Karışık Tepkimeler+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [
          {
            id: "mg_t3_mz_2",
            title: "Labirent 2: Karışık Tepkimeler+",
            description: "Robot ile kaç!",
            questions: [
              {
                id: "q1",
                questionText:
                  "Seviye 1: Bir kimyasal denklemi denkleştirirken ne tür sayılar formüllerin başına yazılır?",
                options: [
                  {
                    id: "1",
                    text: "Katsayı",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Yük",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Alt İndis",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Üst İndis",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q2",
                questionText:
                  "Seviye 2: Yanma tepkimeleri genellikle ne tür tepkimelerdir?",
                options: [
                  {
                    id: "4",
                    text: "Atermik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Endotermik",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "İzotermik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Ekzotermik",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q3",
                questionText:
                  "Seviye 3: Maddelerin oksijen gazı ile tepkimeye girdiği durumlara ne denir?",
                options: [
                  {
                    id: "2",
                    text: "Bozunma",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Yanma",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Sentez",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Nötralleşme",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q4",
                questionText: "Seviye 4: Lavoisier hangi kanunu bulmuştur?",
                options: [
                  {
                    id: "2",
                    text: "Katlı Oranlar",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kütlenin Kor.",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Sabit Oranlar",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Avogadro Yasası",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q5",
                questionText:
                  "Seviye 5: İki veya daha fazla maddenin birleşerek tek bir madde oluşturduğu tepkime?",
                options: [
                  {
                    id: "1",
                    text: "Sentez",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Analiz",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Asit-Baz",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q6",
                questionText:
                  "Seviye 6: Bir bileşiğin daha basit maddelere ayrıştığı tepkime türü hangisidir?",
                options: [
                  {
                    id: "4",
                    text: "Çökelme",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Analiz (Bozunma)",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Sentez",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q7",
                questionText:
                  "Seviye 7: Nötralleşme tepkimelerinde net iyon denklemi neyin oluşumunu gösterir?",
                options: [
                  {
                    id: "3",
                    text: "Gaz çıkışı",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Çökelek",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Su (H2O)",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Tuz (NaCl)",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q8",
                questionText:
                  "Seviye 8: CaCO3 -> CaO + CO2 ne tür bir tepkimedir?",
                options: [
                  {
                    id: "1",
                    text: "Analiz",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Sentez",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Redoks",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q9",
                questionText:
                  "Seviye 9: Fotosentez gerçekleşirken enerji olarak güneş ışığı alınır. Bu nedenle...",
                options: [
                  {
                    id: "1",
                    text: "Endotermiktir",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Bozunmadır",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Ekzotermiktir",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Yanmadır",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q10",
                questionText:
                  "Seviye 10: Gümüş nitrat ile potasyum iyodür sulu çözeltileri karışınca Gümüş İyodür katısı ne olur?",
                options: [
                  {
                    id: "3",
                    text: "Yanar",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Çöker",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Süblimleşir",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Buharlaşır",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q11",
                questionText:
                  "Seviye 11: İki sulu çözeltinin karışarak katı bir madde oluşturduğu tepkimeler?",
                options: [
                  {
                    id: "3",
                    text: "Sentez",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Nötralleşme",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Çözünme-Çökelme",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q12",
                questionText:
                  "Seviye 12: Tepkimeye giren maddelerin kütleleri toplamı ürünlerin kütleleri toplamına eşittir diyen kanun?",
                options: [
                  {
                    id: "1",
                    text: "Kütlenin Korunumu",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Hacim Korunumu",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Sabit Oranlar",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Katlı Oranlar",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q13",
                questionText:
                  "Seviye 13: Metalin asitle verdiği tepkime sonucunda genellikle hangi gaz çıkar?",
                options: [
                  {
                    id: "1",
                    text: "H2",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "NO2",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "O2",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "CO2",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q14",
                questionText:
                  "Seviye 14: Asit ve bazın tepkimeye girerek tuz ve su oluşturduğu tepkimeler?",
                options: [
                  {
                    id: "4",
                    text: "Analiz",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Nötralleşme",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Sentez",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Çökelme",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q15",
                questionText:
                  "Seviye 15: Kimyasal tepkimelerde hangi zerreceklerin alışverişi bağ kopması ve oluşumunu sağlar?",
                options: [
                  {
                    id: "4",
                    text: "Çekirdek",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Elektron",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Nötron",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Proton",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q16",
                questionText:
                  "Seviye 16: Endotermik tepkimeler gerçekleşirken ortamdan ne alırlar?",
                options: [
                  {
                    id: "3",
                    text: "Işık",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Basınç",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Kütle",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Isı",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q17",
                questionText:
                  "Seviye 17: H2 + 1/2 O2 -> H2O ne tür bir tepkimedir?",
                options: [
                  {
                    id: "2",
                    text: "Analiz",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Çökelme",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Sentez",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Nötralleşme",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q18",
                questionText:
                  "Seviye 18: CH4 + 2O2 -> CO2 + 2H2O ne tür bir tepkimedir?",
                options: [
                  {
                    id: "2",
                    text: "Nötralleşme",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Sentez",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Redoks olmayan",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Yanma",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q19",
                questionText:
                  "Seviye 19: HCl + NaOH -> NaCl + H2O ne tür bir tepkimedir?",
                options: [
                  {
                    id: "4",
                    text: "Analiz",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Yanma",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Çökelme",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Asit-Baz",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q20",
                questionText:
                  "Seviye 20: Tepkime okunun solundaki maddelere ne ad verilir?",
                options: [
                  {
                    id: "1",
                    text: "Girenler",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Meydana Gelenler",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Sonuçlar",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Ürünler",
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tema4",
    title: "4. TEMA: MOL KAVRAMI",
    description: "Maddenin miktarını ifade etme ve mol.",
    order: 4,
    modules: [
      {
        id: "t4_mz_1",
        title: "Labirent 1: Mol Hesaplamaları",
        description:
          "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [
          {
            id: "mg_t4_mz_1",
            title: "Labirent 1: Mol Hesaplamaları",
            description: "Robot ile kaç!",
            questions: [
              {
                id: "q1",
                questionText:
                  "Seviye 1: Oda koşullarında (25°C, 1 atm) 1 mol ideal gaz kaç Litre hacim kaplar?",
                options: [
                  {
                    id: "3",
                    text: "11.2 L",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "24.5 L",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "22.5 L",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "22.4 L",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q2",
                questionText:
                  "Seviye 2: Suyun (H2O) mol kütlesi kaçtır (H:1, O:16)?",
                options: [
                  {
                    id: "1",
                    text: "18 g/mol",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "17 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "20 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "16 g/mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q3",
                questionText: "Seviye 3: Gerçek atom kütlesi ne anlama gelir?",
                options: [
                  {
                    id: "1",
                    text: "1 tane atomun kütlesi",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Toplam kütle",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "1 molün kütlesi",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Bağıl atom kütlesi",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q4",
                questionText:
                  "Seviye 4: Standart şartlarda 11.2 L hacim kaplayan bir ideal gaz kaç moldür?",
                options: [
                  {
                    id: "1",
                    text: "0.5 mol",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "0.25 mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "1 mol",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "2 mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q5",
                questionText:
                  "Seviye 5: 1 amu (akb) Karbon-12 kütlesinin kaçta kaçıdır?",
                options: [
                  {
                    id: "2",
                    text: "1/6'sı",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Tamamı",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "2 katı",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "1/12'si",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q6",
                questionText:
                  "Seviye 6: 0.1 mol glikoz (C6H12O6) içeriğinde kaç mol C atomu vardır?",
                options: [
                  {
                    id: "4",
                    text: "0.1 mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "0.6 mol",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "1.2 mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "6 mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q7",
                questionText:
                  "Seviye 7: CH4'ün (Metan) mol kütlesi kaçtır (C:12, H:1)?",
                options: [
                  {
                    id: "4",
                    text: "12 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "16 g/mol",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "14 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "18 g/mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q8",
                questionText:
                  "Seviye 8: Bütün gazların 1 molü standart şartlarda (0°C, 1 atm) kaç Litre hacim kaplar?",
                options: [
                  {
                    id: "3",
                    text: "11.2 L",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "22.4 L",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "1 L",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "24.5 L",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q9",
                questionText:
                  "Seviye 9: 36 gram Su (H2O) kaç moldür (H:1, O:16)?",
                options: [
                  {
                    id: "4",
                    text: "3 mol",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "0.5 mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "1 mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "2 mol",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q10",
                questionText:
                  "Seviye 10: 0.5 mol Su (H2O) kaç gramdır (H:1, O:16)?",
                options: [
                  {
                    id: "3",
                    text: "4.5 g",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "18 g",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "36 g",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "9 g",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q11",
                questionText:
                  "Seviye 11: 5 mol H2O formülünde toplam kaç mol atom içerir?",
                options: [
                  {
                    id: "1",
                    text: "15 mol",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "5 mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "3 mol",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "10 mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q12",
                questionText:
                  "Seviye 12: 1 mol O2 molekülünde kaç mol oksijen atomu vardır?",
                options: [
                  {
                    id: "2",
                    text: "1",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "2",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "0.5",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "4",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q13",
                questionText: "Seviye 13: Kaç tane molekül 1 mol yapar?",
                options: [
                  {
                    id: "2",
                    text: "10 milyon",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Milyar",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Avogadro sayısı kadar",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "1 Trilyon",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q14",
                questionText:
                  "Seviye 14: Bağıl atom kütlesi bulunurken hangi izotop referans alınmıştır?",
                options: [
                  {
                    id: "2",
                    text: "Hidrojen-1",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Azot-14",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Oksijen-16",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Karbon-12",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q15",
                questionText:
                  "Seviye 15: 1 mol NaCl'de kaç tane Na iyonu vardır?",
                options: [
                  {
                    id: "2",
                    text: "1",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "2",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "N_A/2",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "N_A",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q16",
                questionText:
                  "Seviye 16: CO2 gazının mol kütlesi kaçtır (C:12, O:16)?",
                options: [
                  {
                    id: "2",
                    text: "28 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "12 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "32 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "44 g/mol",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q17",
                questionText:
                  "Seviye 17: N2 gazının mol kütlesi kaçtır (N:14)?",
                options: [
                  {
                    id: "2",
                    text: "14 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "42 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "28 g/mol",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "7 g/mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q18",
                questionText:
                  "Seviye 18: Avogadro sayısı (N_A) yaklaşık olarak kaçtır?",
                options: [
                  {
                    id: "3",
                    text: "6.02x10^24",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "6.02x10^23",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "10^23",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "10^24",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q19",
                questionText: "Seviye 19: 88 gram CO2 kaç moldür (C:12, O:16)?",
                options: [
                  {
                    id: "2",
                    text: "1.5 mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "2 mol",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "1 mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "0.5 mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q20",
                questionText: "Seviye 20: 1 mol C atomu kaç gramdır (C: 12)?",
                options: [
                  {
                    id: "2",
                    text: "6 g",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "12 g",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "24 g",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "1 g",
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "t4_mz_2",
        title: "Labirent 2: Mol Uzmanı+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [
          {
            id: "mg_t4_mz_2",
            title: "Labirent 2: Mol Uzmanı+",
            description: "Robot ile kaç!",
            questions: [
              {
                id: "q1",
                questionText:
                  "Seviye 1: 36 gram Su (H2O) kaç moldür (H:1, O:16)?",
                options: [
                  {
                    id: "4",
                    text: "3 mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "1 mol",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "0.5 mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "2 mol",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q2",
                questionText:
                  "Seviye 2: CH4'ün (Metan) mol kütlesi kaçtır (C:12, H:1)?",
                options: [
                  {
                    id: "3",
                    text: "18 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "14 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "12 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "16 g/mol",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q3",
                questionText: "Seviye 3: 1 mol C atomu kaç gramdır (C: 12)?",
                options: [
                  {
                    id: "4",
                    text: "24 g",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "1 g",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "12 g",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "6 g",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q4",
                questionText:
                  "Seviye 4: CO2 gazının mol kütlesi kaçtır (C:12, O:16)?",
                options: [
                  {
                    id: "1",
                    text: "44 g/mol",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "12 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "28 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "32 g/mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q5",
                questionText:
                  "Seviye 5: 0.1 mol glikoz (C6H12O6) içeriğinde kaç mol C atomu vardır?",
                options: [
                  {
                    id: "2",
                    text: "6 mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "0.6 mol",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "1.2 mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "0.1 mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q6",
                questionText: "Seviye 6: N2 gazının mol kütlesi kaçtır (N:14)?",
                options: [
                  {
                    id: "3",
                    text: "7 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "42 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "28 g/mol",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "14 g/mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q7",
                questionText:
                  "Seviye 7: 1 mol NaCl'de kaç tane Na iyonu vardır?",
                options: [
                  {
                    id: "3",
                    text: "2",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "N_A",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "N_A/2",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "1",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q8",
                questionText:
                  "Seviye 8: Avogadro sayısı (N_A) yaklaşık olarak kaçtır?",
                options: [
                  {
                    id: "3",
                    text: "6.02x10^24",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "6.02x10^23",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "10^24",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "10^23",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q9",
                questionText:
                  "Seviye 9: Oda koşullarında (25°C, 1 atm) 1 mol ideal gaz kaç Litre hacim kaplar?",
                options: [
                  {
                    id: "3",
                    text: "11.2 L",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "24.5 L",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "22.5 L",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "22.4 L",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q10",
                questionText:
                  "Seviye 10: 0.5 mol Su (H2O) kaç gramdır (H:1, O:16)?",
                options: [
                  {
                    id: "4",
                    text: "36 g",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "4.5 g",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "9 g",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "18 g",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q11",
                questionText:
                  "Seviye 11: 5 mol H2O formülünde toplam kaç mol atom içerir?",
                options: [
                  {
                    id: "3",
                    text: "10 mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "3 mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "15 mol",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "5 mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q12",
                questionText:
                  "Seviye 12: Bağıl atom kütlesi bulunurken hangi izotop referans alınmıştır?",
                options: [
                  {
                    id: "4",
                    text: "Azot-14",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Oksijen-16",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Hidrojen-1",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Karbon-12",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q13",
                questionText: "Seviye 13: Kaç tane molekül 1 mol yapar?",
                options: [
                  {
                    id: "2",
                    text: "10 milyon",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "1 Trilyon",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Avogadro sayısı kadar",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Milyar",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q14",
                questionText:
                  "Seviye 14: 1 amu (akb) Karbon-12 kütlesinin kaçta kaçıdır?",
                options: [
                  {
                    id: "1",
                    text: "1/12'si",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "1/6'sı",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "2 katı",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Tamamı",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q15",
                questionText:
                  "Seviye 15: Suyun (H2O) mol kütlesi kaçtır (H:1, O:16)?",
                options: [
                  {
                    id: "1",
                    text: "18 g/mol",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "16 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "20 g/mol",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "17 g/mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q16",
                questionText: "Seviye 16: 88 gram CO2 kaç moldür (C:12, O:16)?",
                options: [
                  {
                    id: "3",
                    text: "1 mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "1.5 mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "0.5 mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "2 mol",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q17",
                questionText:
                  "Seviye 17: Standart şartlarda 11.2 L hacim kaplayan bir ideal gaz kaç moldür?",
                options: [
                  {
                    id: "3",
                    text: "2 mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "1 mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "0.5 mol",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "0.25 mol",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q18",
                questionText:
                  "Seviye 18: Bütün gazların 1 molü standart şartlarda (0°C, 1 atm) kaç Litre hacim kaplar?",
                options: [
                  {
                    id: "1",
                    text: "22.4 L",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "11.2 L",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "24.5 L",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "1 L",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q19",
                questionText:
                  "Seviye 19: 1 mol O2 molekülünde kaç mol oksijen atomu vardır?",
                options: [
                  {
                    id: "2",
                    text: "1",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "2",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "0.5",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "4",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q20",
                questionText: "Seviye 20: Gerçek atom kütlesi ne anlama gelir?",
                options: [
                  {
                    id: "2",
                    text: "1 molün kütlesi",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Bağıl atom kütlesi",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "1 tane atomun kütlesi",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Toplam kütle",
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tema5",
    title: "5. TEMA: GAZLAR",
    description: "Gazların genel özellikleri ve davranışları.",
    order: 5,
    modules: [
      {
        id: "t5_m1",
        title: "Gazların Genel Özellikleri",
        description:
          "Gazların temel özelliklerini kavram haritasında keşfedin.",
        type: "mindmap",
        mindmapNodes: [
          {
            id: "sikistirilma",
            label: "Sıkıştırılabilme",
            color: "bg-blue-500",
            question: {
              text: "Gazlar arasındaki boşluklar çok fazladır, bu sayede yüksek basınç altında sıkıştırılabilirler. Hangi görsel sıkıştırılabilme (örneğin bir şırınga içinde) özelliğini gösterir?",
              options: [
                {
                  text: "Gazların sıkıştırılması",
                  isCorrect: true,
                  svgId: "gas_compress",
                },
                {
                  text: "Katıların sıkıştırılamaması",
                  isCorrect: false,
                  svgId: "solid_block",
                },
              ],
            },
          },
          {
            id: "yayilma",
            label: "Yayılıcılık",
            color: "bg-pink-500",
            question: {
              text: "Gaz tanecikleri bulundukları ortama hızla yayılarak her yeri kaplarlar. Odaya sıkılan parfümün kokusunun her yerden duyulması hangi olaya en iyi örnektir?",
              options: [
                {
                  text: "Odaya parfüm sıkılması",
                  isCorrect: true,
                  svgId: "perfume",
                },
                {
                  text: "Su buharının yoğunlaşması",
                  isCorrect: false,
                  svgId: "boiling_water",
                },
              ],
            },
          },
          {
            id: "genlesme",
            label: "Genleşme",
            color: "bg-red-500",
            question: {
              text: "Bütün gazlar ısıtıldıklarında hacimleri artar (genleşirler). Sıcak hava balonlarının uçması gazların bu özelliği sayesindedir. Hangi görsel genleşmeyi temsil eder?",
              options: [
                {
                  text: "Isıtılan kabın ucundaki balonun şişmesi",
                  isCorrect: true,
                  svgId: "gas_expand",
                },
                {
                  text: "Buzun erimesi (Katı hal değişimi)",
                  isCorrect: false,
                  svgId: "ice_melting",
                },
              ],
            },
          },
          {
            id: "homojen",
            label: "Homojen Karışım",
            color: "bg-purple-500",
            question: {
              text: "Gazlar kendi aralarında her oranda ve her zaman tamamen iç içe geçerek homojen karışımlar (çözeltiler) oluştururlar. Atmosfer bunun bir örneğidir. Hangi görsel bunu temsil etmektedir?",
              options: [
                {
                  text: "Farklı gazların iç içe geçip tamamen karışması",
                  isCorrect: true,
                  svgId: "gas_mix",
                },
                {
                  text: "Zeytinyağı ve suyun heterojen kalması",
                  isCorrect: false,
                  svgId: "oil_water",
                },
              ],
            },
          },
          {
            id: "basinc",
            label: "Basınç Yapma",
            color: "bg-emerald-500",
            question: {
              text: "Gaz tanecikleri sürekli hareket halindedir ve kabın iç yüzeylerine çarparak her noktaya eşit oranda kuvvet (basınç) uygularlar. Hangi görsel gaz basıncını temsil eder?",
              options: [
                {
                  text: "Taneciklerin kabın çeperlerine çarpması",
                  isCorrect: true,
                  svgId: "gas_pressure",
                },
                {
                  text: "Elmanın çürümesi",
                  isCorrect: false,
                  svgId: "apple_brown",
                },
              ],
            },
          },
        ],
      },
      {
        id: "t5_m2",
        title: "Gaz Kanunları Dedektifi",
        description:
          "Gaz kanunlarını ait oldukları formüllerle ve sabit tutulan değerlerle eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Boyle Kanunu\n(Sabit T ve n)",
            right: "P₁·V₁ = P₂·V₂",
            rightType: "text",
          },
          {
            left: "Charles Kanunu\n(Sabit P ve n)",
            right: "V₁/T₁ = V₂/T₂",
            rightType: "text",
          },
          {
            left: "Gay-Lussac Kanunu\n(Sabit V ve n)",
            right: "P₁/T₁ = P₂/T₂",
            rightType: "text",
          },
          {
            left: "Avogadro Kanunu\n(Sabit P ve T)",
            right: "V₁/n₁ = V₂/n₂",
            rightType: "text",
          },
          {
            left: "İdeal Gaz Denklemi\n(Tümü değişebilir)",
            right: "P·V = n·R·T",
            rightType: "text",
          },
        ],
      },
      {
        id: "t5_m3",
        title: "Basınç ve Hacim Dönüşümleri",
        description:
          "Gaz hesaplamalarında kullanılan temel ölçü birimlerini birbirleri cinsinden eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "1 Atmosfer (atm) basınç",
            right: "76 cmHg (760 mmHg)",
            rightType: "text",
          },
          { left: "1 Torr basınç", right: "1 mmHg", rightType: "text" },
          {
            left: "Mutlak Sıfır Noktası (0 Kelvin)",
            right: "-273.15 °C",
            rightType: "text",
          },
          { left: "1 Litre (L) hacim", right: "1000 mL", rightType: "text" },
          {
            left: "Doğadaki Standart Şartlar (Sıcaklık ve Basınç)",
            right: "25 °C ve 1 atm",
            rightType: "text",
          },
        ],
      },
      {
        id: "t5_m4",
        title: "Kinetik Teori Kavramları",
        description:
          "Gazların özelliklerini ve davranışlarını açıklayan Kinetik Teori kavramlarını eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Gazın başka bir gaz içinde yayılması",
            right: "Difüzyon",
            rightType: "text",
          },
          {
            left: "Gazın küçük bir delikten boşluğa yayılması",
            right: "Efüzyon (Dışarı Sızma)",
            rightType: "text",
          },
          {
            left: "Gazların davranışlarını matematiksel modellerle açıklayan teori",
            right: "Kinetik Teori",
            rightType: "text",
          },
          {
            left: "Ortalama kinetik enerjinin bağlı olduğu tek değişken",
            right: "Mutlak Sıcaklık (Kelvin)",
            rightType: "text",
          },
          {
            left: "Kinetik teorinin varsaydığı tanecikler arası kuvvet",
            right: "Sıfır kabul edilir",
            rightType: "text",
          },
        ],
      },
      {
        id: "t5_m5",
        title: "Atmosferdeki Gazlar ve Etkileri",
        description:
          "Atmosferde bulunan gazları ve dünya üzerinde yarattıkları çevresel etkileri eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Karbondioksit (CO₂) gazının atmosferde aşırı birikmesi",
            right: "Sera Etkisi (Küresel Isınma)",
            rightType: "text",
          },
          {
            left: "SO₂ (Kükürtdioksit) ve NO₂ (Azotdioksit) gazlarının suyla birleşmesi",
            right: "Asit Yağmurları",
            rightType: "text",
          },
          {
            left: "Güneşin zararlı UV ışınlarını süzen gaz bulutu",
            right: "Ozon Tabakası (O₃)",
            rightType: "text",
          },
          {
            left: "Klima ve buzdolaplarında kullanılan çevreye zararlı eski gazlar",
            right: "CFC (Kloroflorokarbon)",
            rightType: "text",
          },
          {
            left: "Atmosferin %78'ini oluşturan yaşamın temel gazı",
            right: "Azot (N₂) Gazı",
            rightType: "text",
          },
        ],
      },
      {
        id: "t5_m6",
        title: "Gaz Yasaları ve Kanunları",
        description:
          "Gazların hacim, sıcaklık, basınç ve mol sayısıyla olan ilişkilerini (yasaları) eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Basınç ve Hacim Ters Orantılıdır (P-V)",
            right: "Boyle Yasası",
            rightType: "text",
          },
          {
            left: "Hacim ve Mutlak Sıcaklık Doğru Orantılıdır (V-T)",
            right: "Charles Yasası",
            rightType: "text",
          },
          {
            left: "Basınç ve Mutlak Sıcaklık Doğru Orantılıdır (P-T)",
            right: "Gay-Lussac Yasası",
            rightType: "text",
          },
          {
            left: "Hacim ve Mol Sayısı Doğru Orantılıdır (V-n)",
            right: "Avogadro Yasası",
            rightType: "text",
          },
          {
            left: "Tüm gazların uyduğu varsayılan formül (PV=nRT)",
            right: "İdeal Gaz Denklemi",
            rightType: "text",
          },
        ],
      },
      {
        id: "t5_mz_1",
        title: "Labirent 1: Gaz Yasaları",
        description:
          "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [
          {
            id: "mg_t5_mz_1",
            title: "Labirent 1: Gaz Yasaları",
            description: "Robot ile kaç!",
            questions: [
              {
                id: "q1",
                questionText:
                  "Seviye 1: Gaz moleküllerinin küçük bir delikten boşluğa yayılmasına ne denir?",
                options: [
                  {
                    id: "3",
                    text: "Süblimleşme",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Efüzyon",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Konveksiyon",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Difüzyon",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q2",
                questionText:
                  "Seviye 2: Bütün molekül hareketlerinin durduğu varsayılan 0 K sıcaklığa ne denir?",
                options: [
                  {
                    id: "3",
                    text: "Kritik",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Eksi Bir",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Mutlak Sıfır",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Donma Noktası",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q3",
                questionText:
                  "Seviye 3: 0 °C, 22.4 L hacimde ve 1 atm basınçta ideal gaz kaç moldür?",
                options: [
                  {
                    id: "3",
                    text: "2 mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "0.5 mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "0.25 mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "1 mol",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q4",
                questionText:
                  "Seviye 4: Eşit hacimlerde aynı P ve T altında bulunan gazların nesi aynıdır?",
                options: [
                  {
                    id: "4",
                    text: "Hızları",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Özkütleleri",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Mol sayıları",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Kütleleri",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q5",
                questionText:
                  "Seviye 5: Gerçek bir gazı ideal gaza yaklaştırmak için sıcaklık ve basınç nasıl olmalı?",
                options: [
                  {
                    id: "3",
                    text: "Yüksek P - Düşük T",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Yüksek T - Düşük P",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Düşük T - Düşük P",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Yüksek P - Yüksek T",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q6",
                questionText:
                  "Seviye 6: Gazların yayılması olayına (difüzyon) ilişkin yasayı kim bulmuştur?",
                options: [
                  {
                    id: "1",
                    text: "Graham",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Dalton",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Avogadro",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Boyle",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q7",
                questionText: "Seviye 7: 0 Santigrat kaç Kelvin'dir?",
                options: [
                  {
                    id: "4",
                    text: "-273 K",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "273 K",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "0 K",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "100 K",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q8",
                questionText:
                  "Seviye 8: Dalton'un Kısmi Basınçlar Yasasına göre toplam basınç neye eşittir?",
                options: [
                  {
                    id: "1",
                    text: "Kısmi P toplamına",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Sıcaklığa",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Mol çarpımına",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Hacim toplamına",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q9",
                questionText:
                  "Seviye 9: Gaz taneciklerinin enerjisini ve hareketliliğini açıklayan teori nedir?",
                options: [
                  {
                    id: "4",
                    text: "Gaz yasaları",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Atomik Teori",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Bağ Teorisi",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kinetik Teori",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q10",
                questionText:
                  "Seviye 10: Bir gazın sıvılaştırılamadığı sınırı belirleyen en yüksek sıcaklık nedir?",
                options: [
                  {
                    id: "2",
                    text: "Kaynama Noktası",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Kırağı Noktası",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kritik Sıcaklık",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Süblimleşme",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q11",
                questionText:
                  "Seviye 11: İdeal gaz denklemindeki R sabiti (atm.L / mol.K cinsi) nedir?",
                options: [
                  {
                    id: "2",
                    text: "8.314",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "22.4 / 273",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "0.082 L/mol°C",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "1",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q12",
                questionText:
                  "Seviye 12: Gaz moleküllerinin hızları mutlak sıcaklığın (Kelvin) nesiyle orantılıdır?",
                options: [
                  {
                    id: "3",
                    text: "Kendisiyle",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Karesiyle",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kareköküyle",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Küpüyle",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q13",
                questionText:
                  "Seviye 13: Gaz tanecikleri arasındaki esnek çarpışmalarda ne korunur?",
                options: [
                  {
                    id: "4",
                    text: "Sıcaklık",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Bağ Enerjisi",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Yarıçap",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kinetik Enerji",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q14",
                questionText:
                  "Seviye 14: Sabit sıcaklıkta basınç ile hacim ters orantılıdır diyen yasa?",
                options: [
                  {
                    id: "1",
                    text: "Boyle Yasası",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Avogadro Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Charles Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Gay-Lussac",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q15",
                questionText:
                  "Seviye 15: P.V = n.R.T denklemine ne ad verilir?",
                options: [
                  {
                    id: "3",
                    text: "Graham Difüzyon",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kısmi Basınç",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Van der Waals",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "İdeal Gaz Denk.",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q16",
                questionText:
                  "Seviye 16: Sabit basınçta hacmin mutlak sıcaklıkla doğru orantılı olduğunu söyleyen yasa?",
                options: [
                  {
                    id: "3",
                    text: "Dalton Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Charles Yasası",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Graham",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Boyle Yasası",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q17",
                questionText:
                  "Seviye 17: Hafif gaz molekülleri ağır gaz moleküllerine göre nasıl hareket eder?",
                options: [
                  {
                    id: "2",
                    text: "Yavaş",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Hızlı",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Aynı",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Fark yok",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q18",
                questionText:
                  "Seviye 18: Sabit hacimde basınç ve sıcaklık (Kelvin) doğru orantılıdır diyen yasa?",
                options: [
                  {
                    id: "3",
                    text: "Boyle Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Avogadro Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Hes Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Gay-Lussac Yasası",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q19",
                questionText:
                  "Seviye 19: İdeal olmayan ve doğada bulunan gazlara ne denir?",
                options: [
                  {
                    id: "1",
                    text: "Gerçek Gaz",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Plazma",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Süper Gaz",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Asal Gaz",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q20",
                questionText:
                  "Seviye 20: Gaz basıncı, taneciklerin kap içerisindeki birim alana yaptığı ne ile açıklanır?",
                options: [
                  {
                    id: "3",
                    text: "Ses dalgaları",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Atom yarıçapı",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Çarpma Kuv.",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Ağırlık",
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "t5_mz_2",
        title: "Labirent 2: Kinetik Uzmanlık+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [
          {
            id: "mg_t5_mz_2",
            title: "Labirent 2: Kinetik Uzmanlık+",
            description: "Robot ile kaç!",
            questions: [
              {
                id: "q1",
                questionText:
                  "Seviye 1: Gerçek bir gazı ideal gaza yaklaştırmak için sıcaklık ve basınç nasıl olmalı?",
                options: [
                  {
                    id: "3",
                    text: "Yüksek P - Düşük T",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Düşük T - Düşük P",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Yüksek T - Düşük P",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Yüksek P - Yüksek T",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q2",
                questionText:
                  "Seviye 2: Hafif gaz molekülleri ağır gaz moleküllerine göre nasıl hareket eder?",
                options: [
                  {
                    id: "4",
                    text: "Fark yok",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Yavaş",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Aynı",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Hızlı",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q3",
                questionText:
                  "Seviye 3: Gaz moleküllerinin küçük bir delikten boşluğa yayılmasına ne denir?",
                options: [
                  {
                    id: "2",
                    text: "Difüzyon",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Konveksiyon",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Süblimleşme",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Efüzyon",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q4",
                questionText:
                  "Seviye 4: 0 °C, 22.4 L hacimde ve 1 atm basınçta ideal gaz kaç moldür?",
                options: [
                  {
                    id: "3",
                    text: "2 mol",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "0.25 mol",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "0.5 mol",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "1 mol",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q5",
                questionText:
                  "Seviye 5: Gazların yayılması olayına (difüzyon) ilişkin yasayı kim bulmuştur?",
                options: [
                  {
                    id: "3",
                    text: "Boyle",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Dalton",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Avogadro",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Graham",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q6",
                questionText:
                  "Seviye 6: Gaz taneciklerinin enerjisini ve hareketliliğini açıklayan teori nedir?",
                options: [
                  {
                    id: "4",
                    text: "Gaz yasaları",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Atomik Teori",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Bağ Teorisi",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kinetik Teori",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q7",
                questionText:
                  "Seviye 7: Gaz basıncı, taneciklerin kap içerisindeki birim alana yaptığı ne ile açıklanır?",
                options: [
                  {
                    id: "2",
                    text: "Ağırlık",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Atom yarıçapı",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Ses dalgaları",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Çarpma Kuv.",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q8",
                questionText:
                  "Seviye 8: Bir gazın sıvılaştırılamadığı sınırı belirleyen en yüksek sıcaklık nedir?",
                options: [
                  {
                    id: "2",
                    text: "Kaynama Noktası",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kritik Sıcaklık",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Kırağı Noktası",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Süblimleşme",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q9",
                questionText:
                  "Seviye 9: Sabit basınçta hacmin mutlak sıcaklıkla doğru orantılı olduğunu söyleyen yasa?",
                options: [
                  {
                    id: "4",
                    text: "Graham",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Charles Yasası",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Boyle Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Dalton Yasası",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q10",
                questionText:
                  "Seviye 10: Sabit hacimde basınç ve sıcaklık (Kelvin) doğru orantılıdır diyen yasa?",
                options: [
                  {
                    id: "4",
                    text: "Hes Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Boyle Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Avogadro Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Gay-Lussac Yasası",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q11",
                questionText:
                  "Seviye 11: Bütün molekül hareketlerinin durduğu varsayılan 0 K sıcaklığa ne denir?",
                options: [
                  {
                    id: "2",
                    text: "Donma Noktası",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Kritik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Mutlak Sıfır",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Eksi Bir",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q12",
                questionText:
                  "Seviye 12: İdeal gaz denklemindeki R sabiti (atm.L / mol.K cinsi) nedir?",
                options: [
                  {
                    id: "2",
                    text: "8.314",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "1",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "0.082 L/mol°C",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "22.4 / 273",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q13",
                questionText:
                  "Seviye 13: Eşit hacimlerde aynı P ve T altında bulunan gazların nesi aynıdır?",
                options: [
                  {
                    id: "4",
                    text: "Hızları",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Mol sayıları",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Özkütleleri",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kütleleri",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q14",
                questionText:
                  "Seviye 14: İdeal olmayan ve doğada bulunan gazlara ne denir?",
                options: [
                  {
                    id: "2",
                    text: "Asal Gaz",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Süper Gaz",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Plazma",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Gerçek Gaz",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q15",
                questionText:
                  "Seviye 15: Dalton'un Kısmi Basınçlar Yasasına göre toplam basınç neye eşittir?",
                options: [
                  {
                    id: "4",
                    text: "Mol çarpımına",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Hacim toplamına",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Sıcaklığa",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kısmi P toplamına",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q16",
                questionText:
                  "Seviye 16: P.V = n.R.T denklemine ne ad verilir?",
                options: [
                  {
                    id: "1",
                    text: "İdeal Gaz Denk.",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Van der Waals",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kısmi Basınç",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Graham Difüzyon",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q17",
                questionText: "Seviye 17: 0 Santigrat kaç Kelvin'dir?",
                options: [
                  {
                    id: "1",
                    text: "273 K",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "-273 K",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "100 K",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "0 K",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q18",
                questionText:
                  "Seviye 18: Sabit sıcaklıkta basınç ile hacim ters orantılıdır diyen yasa?",
                options: [
                  {
                    id: "1",
                    text: "Boyle Yasası",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Gay-Lussac",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Charles Yasası",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Avogadro Yasası",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q19",
                questionText:
                  "Seviye 19: Gaz tanecikleri arasındaki esnek çarpışmalarda ne korunur?",
                options: [
                  {
                    id: "4",
                    text: "Sıcaklık",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kinetik Enerji",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Bağ Enerjisi",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Yarıçap",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q20",
                questionText:
                  "Seviye 20: Gaz moleküllerinin hızları mutlak sıcaklığın (Kelvin) nesiyle orantılıdır?",
                options: [
                  {
                    id: "4",
                    text: "Küpüyle",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Karesiyle",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kareköküyle",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Kendisiyle",
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tema6",
    title: "6. TEMA: ASİTLER VE BAZLAR",
    description:
      "Asitlerin ve bazların özelliklerini keşfet, türüne göre sınıflandır.",
    order: 6,
    modules: [
      {
        id: "t6_m1",
        title: "Asit mi, Baz mı, Nötr mü?",
        description:
          "Karşına çıkan moleküllerin asit, baz veya nötr olduğuna karar ver.",
        type: "classification",
        classifications: [
          {
            id: "c_acidbase",
            title: "Asit-Baz Sınıflandırması",
            description:
              "Kimyasal formülü ve özelliklerini inceleyerek sınıflandırın.",
            options: [
              {
                id: "acid",
                label: "Asit",
                colorClass: "hover:border-red-500 hover:text-red-400",
              },
              {
                id: "base",
                label: "Baz",
                colorClass: "hover:border-blue-500 hover:text-blue-400",
              },
              {
                id: "neutral",
                label: "Nötr",
                colorClass: "hover:border-emerald-500 hover:text-emerald-400",
              },
            ],
            items: [
              {
                id: "ab1",
                molecule: molecules.hcl,
                correctType: "acid",
                explanation:
                  "Hidrojen Klorür (HCl) suda çözündüğünde H⁺ iyonu verir. Kuvvetli bir asittir (Tuz ruhu).",
              },
              {
                id: "ab2",
                molecule: molecules.nh3,
                correctType: "base",
                explanation:
                  "Amonyak (NH₃) yapısında OH olmamasına rağmen suda çözündüğünde OH⁻ iyonu oluşturan zayıf bir bazdır.",
              },
              {
                id: "ab3",
                molecule: molecules.h2o,
                correctType: "neutral",
                explanation:
                  "Saf Su (H₂O) asidik veya bazik özellik göstermez. pH değeri tam 7'dir (Nötr).",
              },
              {
                id: "ab4",
                molecule: {
                  name: "Sodyum Hidroksit",
                  formula: "NaOH",
                  atoms: [
                    { element: "Na", position: [0, 0, 0] },
                    { element: "O", position: [1.4, 0, 0] },
                    { element: "H", position: [2.2, 0, 0] },
                  ],
                  bonds: [
                    { start: [0, 0, 0], end: [1.4, 0, 0] },
                    { start: [1.4, 0, 0], end: [2.2, 0, 0] },
                  ],
                },
                correctType: "base",
                explanation:
                  "Sodyum Hidroksit (NaOH) suda çözündüğünde doğrudan OH⁻ iyonu veren kuvvetli bir bazdır (Sud kostik).",
              },
              {
                id: "ab5",
                molecule: {
                  name: "Sodyum Klorür (Tuz)",
                  formula: "NaCl",
                  atoms: [
                    { element: "Na", position: [-0.7, 0, 0] },
                    { element: "Cl", position: [1.0, 0, 0] },
                  ],
                  bonds: [{ start: [-0.7, 0, 0], end: [1.0, 0, 0] }],
                },
                correctType: "neutral",
                explanation:
                  "Kuvvetli bir asit ile kuvvetli bir bazın tepkimesinden oluşan Nötr bir tuzdur.",
              },
              {
                id: "ab6",
                molecule: molecules.hcn,
                correctType: "acid",
                explanation:
                  "Hidrojen Siyanür (HCN) suda H⁺ vererek çözünür. Zayıf asidik özellik gösterir.",
              },
            ],
          },
        ],
      },
      {
        id: "t6_m2",
        title: "İndikatör Renk Eşleştirme",
        description:
          "Asit ve baz ortamlarında indikatörlerin (belirteçlerin) hangi rengi aldığını deneyerek bulun.",
        type: "matching",
        pairs: [
          {
            left: "Turnusol Kağıdı (Asit Ortamı)",
            right: "Kırmızı",
            rightType: "text",
          },
          {
            left: "Turnusol Kağıdı (Baz Ortamı)",
            right: "Mavi",
            rightType: "text",
          },
          {
            left: "Fenolftalein (Asit Ortamı)",
            right: "Renksiz",
            rightType: "text",
          },
          {
            left: "Fenolftalein (Baz Ortamı)",
            right: "Pembe",
            rightType: "text",
          },
          {
            left: "Metil Turuncu (Asit Ortamı)",
            right: "Kırmızı ",
            rightType: "text",
          },
          {
            left: "Metil Turuncu (Baz Ortamı)",
            right: "Sarı",
            rightType: "text",
          },
        ],
      },
      {
        id: "t6_m3",
        title: "Gündelik Hayattaki Asitler ve Bazlar",
        description:
          "Evimizde veya çevremizde bulunan maddeleri içerdikleri asit veya bazlarla eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Limon, Portakal, Turunçgiller",
            right: "Sitrik Asit",
            rightType: "text",
          },
          { left: "Sirke", right: "Asetik Asit", rightType: "text" },
          {
            left: "Yoğurt, Süt, Ayran",
            right: "Laktik Asit",
            rightType: "text",
          },
          {
            left: "Mide Özsuyu (Tuz Ruhu)",
            right: "Hidroklorik Asit",
            rightType: "text",
          },
          {
            left: "Sabun, Çamaşır Suyu, Lavabo Açıcı",
            right: "Sodyum Hidroksit (Baz)",
            rightType: "text",
          },
          {
            left: "Gazlı İçecekler",
            right: "Karbonik Asit",
            rightType: "text",
          },
        ],
      },
      {
        id: "t6_m4",
        title: "pH Cetveli Dedektifi",
        description:
          "Verilen pH değerlerini ortamın asit-baz özellikleriyle eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "pH değeri 7'den küçük (pH < 7)",
            right: "Asidik Ortam",
            rightType: "text",
          },
          {
            left: "pH değeri tam 7 (pH = 7)",
            right: "Nötr Ortam",
            rightType: "text",
          },
          {
            left: "pH değeri 7'den büyük (pH > 7)",
            right: "Bazik Ortam",
            rightType: "text",
          },
          { left: "pH = 1", right: "Kuvvetli Asit", rightType: "text" },
          { left: "pH = 13", right: "Kuvvetli Baz", rightType: "text" },
        ],
      },
      {
        id: "t6_m5",
        title: "Yaygın Tuzlar ve Kullanım Alanları",
        description:
          "Günlük hayatta sıkça kullandığımız tuzları (NaCl vb.) yaygın isimleriyle eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "NaCl (Sodyum klorür)",
            right: "Sofra / Yemek Tuzu",
            rightType: "text",
          },
          {
            left: "NaHCO₃ (Sodyum bikarbonat)",
            right: "Yemek Sodası (Kabartma)",
            rightType: "text",
          },
          {
            left: "Na₂CO₃ (Sodyum karbonat)",
            right: "Çamaşır Sodası",
            rightType: "text",
          },
          {
            left: "CaCO₃ (Kalsiyum karbonat)",
            right: "Kireç Taşı (Mermer)",
            rightType: "text",
          },
          {
            left: "NH₄Cl (Amonyum klorür)",
            right: "Nişadır (Pil yapımı)",
            rightType: "text",
          },
        ],
      },
      {
        id: "t6_m6",
        title: "Yaygın Asit ve Baz Formülleri",
        description:
          "Sanayide veya halk arasında bilinen yaygın asit ve bazları formülleriyle eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Sülfürik Asit (Zaç Yağı)",
            right: "H₂SO₄",
            rightType: "text",
          },
          { left: "Nitrik Asit (Kezzap)", right: "HNO₃", rightType: "text" },
          {
            left: "Hidroklorik Asit (Tuz Ruhu)",
            right: "HCl",
            rightType: "text",
          },
          {
            left: "Sodyum Hidroksit (Sud Kostik)",
            right: "NaOH",
            rightType: "text",
          },
          {
            left: "Potasyum Hidroksit (Potas Kostik)",
            right: "KOH",
            rightType: "text",
          },
        ],
      },
      {
        id: "t6_mz_1",
        title: "Labirent 1: pH Özellikleri",
        description:
          "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [
          {
            id: "mg_t6_mz_1",
            title: "Labirent 1: pH Özellikleri",
            description: "Robot ile kaç!",
            questions: [
              {
                id: "q1",
                questionText:
                  "Seviye 1: Asit ve bazın tepkimesi sonucu genelde hangi iki madde oluşur?",
                options: [
                  {
                    id: "3",
                    text: "Asit gazı",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Sadece Su",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Tuz ve Su",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Amonyak",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q2",
                questionText:
                  "Seviye 2: Suda %100'e yakın iyonlaşan asitlere ne denir?",
                options: [
                  {
                    id: "3",
                    text: "Derişik Asit",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kuvvetli Asit",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Seyreltik Asit",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Zayıf Asit",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q3",
                questionText:
                  "Seviye 3: Eğer bir çözeltide pH=10 ise ortam hakkında ne diyebiliriz?",
                options: [
                  {
                    id: "1",
                    text: "Baziktir",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Nötrdür",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Zayıf Asittir",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kuvvetli Asittir",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q4",
                questionText:
                  "Seviye 4: Sulu çözeltisine OH- (hidroksit) iyonu veren maddeler nedir?",
                options: [
                  {
                    id: "2",
                    text: "Asit",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Baz",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Tuz",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Oksit",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q5",
                questionText:
                  "Seviye 5: Metil oranj asitlerde yaklaşık hangi rengi alır?",
                options: [
                  {
                    id: "1",
                    text: "Kırmızı / Pembe",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Sarı",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Yeşil",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Mavi",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q6",
                questionText:
                  "Seviye 6: Tatları acı olan ve ele kayganlık hissi veren kimyasallar?",
                options: [
                  {
                    id: "3",
                    text: "Tatlandırıcılar",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Proteinler",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Bazlar",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Asitler",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q7",
                questionText:
                  "Seviye 7: Karınca asidi (Formik asit) zayıf mıdır, kuvvetli mi?",
                options: [
                  {
                    id: "3",
                    text: "Bilinmez",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kuvvetlidir",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Zayıftır",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Asit değil, bazdır",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q8",
                questionText: "Seviye 8: Kezzap'ın formülü nedir?",
                options: [
                  {
                    id: "3",
                    text: "H2SO4",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "HBr",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "HNO3",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "HCl",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q9",
                questionText:
                  "Seviye 9: Tatları ekşi olan maddeler genellikle hangisidir?",
                options: [
                  {
                    id: "4",
                    text: "Metal oksitler",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Asitler",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Bazlar",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Nötr tuzlar",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q10",
                questionText:
                  "Seviye 10: Çamaşır suyu içeren çözeltinin özelliği?",
                options: [
                  {
                    id: "1",
                    text: "Bazik",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Zayıf Asit",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Nötr",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Asidik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q11",
                questionText:
                  "Seviye 11: pH metrede 7 numarası neyi ifade eder?",
                options: [
                  {
                    id: "1",
                    text: "Nötr",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Bilinmeyen",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Baziklik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Asitlik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q12",
                questionText:
                  "Seviye 12: Oda koşullarında pH değeri 7'den büyük olan çözeltiler nasıldır?",
                options: [
                  {
                    id: "4",
                    text: "Çok Asidik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Asidik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Bazik",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Nötr",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q13",
                questionText: "Seviye 13: Limon suyu hangi gruba girer?",
                options: [
                  {
                    id: "4",
                    text: "Nötr",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Baz",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Tuz",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Asit",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q14",
                questionText:
                  "Seviye 14: Sıvı sabun genel olarak özellik bakımından nedir?",
                options: [
                  {
                    id: "1",
                    text: "Bazik",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Nötr",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Zehirli",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Asidik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q15",
                questionText:
                  "Seviye 15: Turnusol kağıdını asitler hangi renge çevirir?",
                options: [
                  {
                    id: "1",
                    text: "Kırmızı",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Renksiz",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Mor",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Mavi",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q16",
                questionText:
                  "Seviye 16: Tuz ruhunun kimyasal adı/formülü nedir?",
                options: [
                  {
                    id: "4",
                    text: "Asetik Asit",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Nitrik Asit",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "HCl",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Sülfürik Asit",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q17",
                questionText:
                  "Seviye 17: Turnusol kağıdını bazlar hangi renge çevirir?",
                options: [
                  {
                    id: "1",
                    text: "Mavi",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Yeşil",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kırmızı",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Sarı",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q18",
                questionText: "Seviye 18: pH = 2 olan bir çözelti nasıldır?",
                options: [
                  {
                    id: "1",
                    text: "Kuvvetli Asidik",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Zayıf Asidik",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Nötr",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Bazik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q19",
                questionText:
                  "Seviye 19: Sulu çözeltisine H+ veya H3O+ iyonu veren maddeler nedir?",
                options: [
                  {
                    id: "3",
                    text: "Tuz",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Baz",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Asit",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Hidrat",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q20",
                questionText:
                  "Seviye 20: Kanın pH'ı (yaklaşık 7.4) nereye düşer?",
                options: [
                  {
                    id: "2",
                    text: "Nötr",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Kuvvetli Asit",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Hafif Asidik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Hafif Bazik",
                    isCorrect: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "t6_mz_2",
        title: "Labirent 2: Asit Baz Formülleri+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [
          {
            id: "mg_t6_mz_2",
            title: "Labirent 2: Asit Baz Formülleri+",
            description: "Robot ile kaç!",
            questions: [
              {
                id: "q1",
                questionText:
                  "Seviye 1: Sıvı sabun genel olarak özellik bakımından nedir?",
                options: [
                  {
                    id: "3",
                    text: "Nötr",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Zehirli",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Bazik",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Asidik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q2",
                questionText:
                  "Seviye 2: Metil oranj asitlerde yaklaşık hangi rengi alır?",
                options: [
                  {
                    id: "2",
                    text: "Sarı",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Mavi",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Yeşil",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kırmızı / Pembe",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q3",
                questionText:
                  "Seviye 3: pH metrede 7 numarası neyi ifade eder?",
                options: [
                  {
                    id: "3",
                    text: "Baziklik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Nötr",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Bilinmeyen",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Asitlik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q4",
                questionText:
                  "Seviye 4: Tatları ekşi olan maddeler genellikle hangisidir?",
                options: [
                  {
                    id: "2",
                    text: "Bazlar",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Nötr tuzlar",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Asitler",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Metal oksitler",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q5",
                questionText:
                  "Seviye 5: Asit ve bazın tepkimesi sonucu genelde hangi iki madde oluşur?",
                options: [
                  {
                    id: "4",
                    text: "Amonyak",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Asit gazı",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Sadece Su",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Tuz ve Su",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q6",
                questionText:
                  "Seviye 6: Turnusol kağıdını asitler hangi renge çevirir?",
                options: [
                  {
                    id: "1",
                    text: "Kırmızı",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Renksiz",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Mor",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Mavi",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q7",
                questionText:
                  "Seviye 7: Oda koşullarında pH değeri 7'den büyük olan çözeltiler nasıldır?",
                options: [
                  {
                    id: "3",
                    text: "Nötr",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Çok Asidik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Asidik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Bazik",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q8",
                questionText:
                  "Seviye 8: Suda %100'e yakın iyonlaşan asitlere ne denir?",
                options: [
                  {
                    id: "3",
                    text: "Derişik Asit",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Zayıf Asit",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Seyreltik Asit",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Kuvvetli Asit",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q9",
                questionText:
                  "Seviye 9: Eğer bir çözeltide pH=10 ise ortam hakkında ne diyebiliriz?",
                options: [
                  {
                    id: "1",
                    text: "Baziktir",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Kuvvetli Asittir",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Nötrdür",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Zayıf Asittir",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q10",
                questionText:
                  "Seviye 10: Sulu çözeltisine H+ veya H3O+ iyonu veren maddeler nedir?",
                options: [
                  {
                    id: "1",
                    text: "Asit",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Hidrat",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Baz",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Tuz",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q11",
                questionText:
                  "Seviye 11: Kanın pH'ı (yaklaşık 7.4) nereye düşer?",
                options: [
                  {
                    id: "4",
                    text: "Kuvvetli Asit",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Hafif Bazik",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Hafif Asidik",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Nötr",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q12",
                questionText:
                  "Seviye 12: Karınca asidi (Formik asit) zayıf mıdır, kuvvetli mi?",
                options: [
                  {
                    id: "1",
                    text: "Zayıftır",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "Asit değil, bazdır",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Bilinmez",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kuvvetlidir",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q13",
                questionText:
                  "Seviye 13: Çamaşır suyu içeren çözeltinin özelliği?",
                options: [
                  {
                    id: "4",
                    text: "Zayıf Asit",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Nötr",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Asidik",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Bazik",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q14",
                questionText:
                  "Seviye 14: Tuz ruhunun kimyasal adı/formülü nedir?",
                options: [
                  {
                    id: "2",
                    text: "Sülfürik Asit",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Asetik Asit",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Nitrik Asit",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "HCl",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q15",
                questionText:
                  "Seviye 15: Turnusol kağıdını bazlar hangi renge çevirir?",
                options: [
                  {
                    id: "4",
                    text: "Yeşil",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Sarı",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Kırmızı",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Mavi",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q16",
                questionText: "Seviye 16: Kezzap'ın formülü nedir?",
                options: [
                  {
                    id: "1",
                    text: "HNO3",
                    isCorrect: true,
                  },
                  {
                    id: "4",
                    text: "HBr",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "H2SO4",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "HCl",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q17",
                questionText:
                  "Seviye 17: Sulu çözeltisine OH- (hidroksit) iyonu veren maddeler nedir?",
                options: [
                  {
                    id: "4",
                    text: "Oksit",
                    isCorrect: false,
                  },
                  {
                    id: "2",
                    text: "Asit",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Tuz",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Baz",
                    isCorrect: true,
                  },
                ],
              },
              {
                id: "q18",
                questionText:
                  "Seviye 18: Tatları acı olan ve ele kayganlık hissi veren kimyasallar?",
                options: [
                  {
                    id: "1",
                    text: "Bazlar",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Asitler",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Proteinler",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Tatlandırıcılar",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q19",
                questionText: "Seviye 19: pH = 2 olan bir çözelti nasıldır?",
                options: [
                  {
                    id: "1",
                    text: "Kuvvetli Asidik",
                    isCorrect: true,
                  },
                  {
                    id: "2",
                    text: "Zayıf Asidik",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Nötr",
                    isCorrect: false,
                  },
                  {
                    id: "3",
                    text: "Bazik",
                    isCorrect: false,
                  },
                ],
              },
              {
                id: "q20",
                questionText: "Seviye 20: Limon suyu hangi gruba girer?",
                options: [
                  {
                    id: "2",
                    text: "Baz",
                    isCorrect: false,
                  },
                  {
                    id: "4",
                    text: "Nötr",
                    isCorrect: false,
                  },
                  {
                    id: "1",
                    text: "Asit",
                    isCorrect: true,
                  },
                  {
                    id: "3",
                    text: "Tuz",
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tema7",
    title: "7. TEMA: KARIŞIMLAR VE ELEMENTLER",
    description:
      "Element sembolleri ve karışımları ayırma yöntemleri üzerine eşleştirme oyunları.",
    order: 7,
    modules: [
      {
        id: "t7_m1",
        title: "Periyodik Tablo Dedektifi",
        description:
          "Element isimlerini doğru sembolleriyle eşleştirerek hafızanı test et.",
        type: "matching",
        pairs: [
          { left: "Sodyum", right: "Na", rightType: "text" },
          { left: "Potasyum", right: "K", rightType: "text" },
          { left: "Demir", right: "Fe", rightType: "text" },
          { left: "Gümüş", right: "Ag", rightType: "text" },
          { left: "Altın", right: "Au", rightType: "text" },
          { left: "Cıva", right: "Hg", rightType: "text" },
          { left: "Kurşun", right: "Pb", rightType: "text" },
          { left: "Bakır", right: "Cu", rightType: "text" },
        ],
      },
      {
        id: "t7_m2",
        title: "Karışımları Ayırma Laboratuvarı",
        description: "Hangi karışımın hangi yöntemle ayrılacağını eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Tuzlu Su (Tuz ve Su)",
            right: "Basit Damıtma (Buharlaştırma)",
            rightType: "text",
          },
          {
            left: "Kolonya (Alkol ve Su)",
            right: "Ayrımsal Damıtma (Kaynama Noktası)",
            rightType: "text",
          },
          {
            left: "Kum ve Su",
            right: "Süzme (Tanecik Boyutu)",
            rightType: "text",
          },
          {
            left: "Zeytinyağı ve Su",
            right: "Ayırma Hunisi (Yoğunluk Farkı)",
            rightType: "text",
          },
          {
            left: "Demir Tozu ve Kükürt",
            right: "Mıknatısla Ayırma (Manyetiklik)",
            rightType: "text",
          },
          {
            left: "Buğday ve Saman",
            right: "Savurma / Eleme (Yoğunluk)",
            rightType: "text",
          },
        ],
      },
      {
        id: "t7_m3",
        title: "Karışım Türleri Sınıflandırma",
        description:
          "Karışım örneklerini ait oldukları karışım (homojen veya heterojen) türüyle eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Hava, Kolonya, Şekerli Su",
            right: "Homojen Karışım (Çözelti)",
            rightType: "text",
          },
          {
            left: "Zeytinyağı - Su karışımı",
            right: "Heterojen (Emülsiyon)",
            rightType: "text",
          },
          {
            left: "Kum - Su, Tebeşir Tozu - Su",
            right: "Heterojen (Süspansiyon)",
            rightType: "text",
          },
          {
            left: "Duman, Sis, Deodorant Sprey",
            right: "Heterojen (Aerosol)",
            rightType: "text",
          },
          {
            left: "Çelik, Pirinç, Lehim (Alaşım)",
            right: "Homojen (Katı-Katı Çözelti)",
            rightType: "text",
          },
          { left: "Kan, Süt", right: "Heterojen (Kolloid)", rightType: "text" },
        ],
      },
      {
        id: "t7_m4",
        title: "Periyodik Tablo Toplulukları",
        description:
          "Periyodik tablodaki bazı element gruplarının sahip oldukları özel isimleri eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "1A Grubu Elementleri",
            right: "Alkali Metaller",
            rightType: "text",
          },
          {
            left: "2A Grubu Elementleri",
            right: "Toprak Alkali Metaller",
            rightType: "text",
          },
          {
            left: "3A Grubu Elementleri",
            right: "Toprak Metalleri",
            rightType: "text",
          },
          {
            left: "7A Grubu Elementleri",
            right: "Halojenler",
            rightType: "text",
          },
          {
            left: "8A Grubu Elementleri",
            right: "Soygazlar (Asal Gazlar)",
            rightType: "text",
          },
          {
            left: "B Grubu Elementleri",
            right: "Geçiş Metalleri",
            rightType: "text",
          },
        ],
      },
      {
        id: "t7_m5",
        title: "Bileşik Adlandırma Kuralları",
        description:
          "Sık kullanılan kimyasal bileşiklerin formülleriyle adlarını eşleştirin.",
        type: "matching",
        pairs: [
          { left: "NaCl", right: "Sodyum klorür", rightType: "text" },
          { left: "H₂O", right: "Dihidrojen monoksit", rightType: "text" },
          { left: "CO₂", right: "Karbon dioksit", rightType: "text" },
          { left: "N₂O₅", right: "Diazot pentaoksit", rightType: "text" },
          { left: "Al₂O₃", right: "Alüminyum oksit", rightType: "text" },
          { left: "CCl₄", right: "Karbon tetraklorür", rightType: "text" },
        ],
      },
      {
        id: "t7_m6",
        title: "Alaşım Türleri ve İçerikleri",
        description:
          "Günlük hayatta ve sanayide kullanılan homojen katı karışımlarının (alaşımların) temel bileşenlerini eşleştirin.",
        type: "matching",
        pairs: [
          {
            left: "Demir (Fe) ve Karbon (C)",
            right: "Çelik",
            rightType: "text",
          },
          {
            left: "Bakır (Cu) ve Çinko (Zn)",
            right: "Pirinç",
            rightType: "text",
          },
          {
            left: "Bakır (Cu) ve Kalay (Sn)",
            right: "Tunç / Bronz",
            rightType: "text",
          },
          {
            left: "Kurşun (Pb) ve Kalay (Sn)",
            right: "Lehim (Elektrikçilik)",
            rightType: "text",
          },
          {
            left: "Cıva (Hg) ile bir başka metalin alaşımı",
            right: "Amalgam (Diş dolgusu)",
            rightType: "text",
          },
        ],
      },
    ],
  },
];
