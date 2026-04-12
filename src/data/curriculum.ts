import { Theme, Module, MoleculeData } from '../types/curriculum';
import { molecules } from './molecules';

const moleculeList = Object.values(molecules);

const generateMoleculeQuiz = () => {
  return moleculeList.map((correctMol) => {
    // Pick 3 random wrong molecules
    const wrongMols = moleculeList
      .filter(m => m.name !== correctMol.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const options = [correctMol, ...wrongMols].sort(() => 0.5 - Math.random());
    const answerIndex = options.findIndex(m => m.name === correctMol.name);

    return {
      id: `q_${correctMol.name}`,
      q: `Aşağıdaki 3 boyutlu modellerden hangisi ${correctMol.name} (${correctMol.formula}) molekülüne aittir?`,
      optionType: 'molecule' as const,
      moleculeOptions: options,
      answer: answerIndex
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
        description: "Tanecik modellerine bakarak maddelerin element, bileşik veya karışım olduğuna karar verin.",
        type: "classification",
        classifications: [
          {
            id: "c1",
            title: "Madde Sınıflandırma",
            description: "Tanecik modellerini inceleyin.",
            options: [
              { id: 'element', label: 'Element', colorClass: 'hover:border-cyan-500 hover:text-cyan-400' },
              { id: 'compound', label: 'Bileşik', colorClass: 'hover:border-emerald-500 hover:text-emerald-400' },
              { id: 'mixture', label: 'Karışım', colorClass: 'hover:border-amber-500 hover:text-amber-400' }
            ],
            items: [
              {
                id: "i1",
                molecule: molecules.h2o,
                correctType: "compound",
                explanation: "Farklı cins atomlar (H ve O) belirli oranda birleşerek yeni bir saf madde oluşturmuştur."
              },
              {
                id: "i2",
                molecule: molecules.n2,
                correctType: "element",
                explanation: "Aynı cins atomlardan (sadece Azot) oluşan saf maddedir."
              },
              {
                id: "i3",
                molecule: molecules.he,
                correctType: "element",
                explanation: "Aynı cins atomlardan oluşan tek atomlu (monatomik) elementtir."
              },
              {
                id: "i4",
                molecule: molecules.mixture_air,
                correctType: "mixture",
                explanation: "Farklı cins moleküller (N₂ ve O₂) kimyasal bağ kurmadan bir aradadır."
              },
              {
                id: "i5",
                molecule: molecules.co2,
                correctType: "compound",
                explanation: "Karbon ve Oksijen atomları kimyasal bağ ile birleşerek bileşik oluşturmuştur."
              },
              {
                id: "i6",
                molecule: molecules.mixture_salt_water,
                correctType: "mixture",
                explanation: "Su molekülleri ve tuz iyonları (Na⁺, Cl⁻) bir arada bulunur, kimyasal olarak birleşmemişlerdir."
              }
            ]
          }
        ]
      },
      {
        id: "t1_m1_2",
        title: "Atom, Molekül, İyon",
        description: "Tanecik modellerine bakarak maddenin atom, molekül veya iyon olduğuna karar verin.",
        type: "classification",
        classifications: [
          {
            id: "c2",
            title: "Tanecik Türünü Belirle",
            description: "Tanecik modellerini inceleyin.",
            options: [
              { id: 'atom', label: 'Atom', colorClass: 'hover:border-blue-500 hover:text-blue-400' },
              { id: 'molecule', label: 'Molekül', colorClass: 'hover:border-purple-500 hover:text-purple-400' },
              { id: 'ion', label: 'İyon', colorClass: 'hover:border-pink-500 hover:text-pink-400' }
            ],
            items: [
              {
                id: "i1",
                molecule: molecules.atom_he,
                correctType: "atom",
                explanation: "Tek bir çekirdek etrafında bulunan elektronlardan oluşan, kimyasal bağ yapmamış tekil taneciktir."
              },
              {
                id: "i2",
                molecule: molecules.h2o,
                correctType: "molecule",
                explanation: "Birden fazla atomun kovalent bağ ile birleşerek oluşturduğu bağımsız tanecik grubudur."
              },
              {
                id: "i3",
                molecule: molecules.ion_na,
                correctType: "ion",
                explanation: "Elektron vermiş veya almış, elektrik yüklü taneciktir (Na⁺)."
              },
              {
                id: "i4",
                molecule: molecules.o2,
                correctType: "molecule",
                explanation: "Aynı cins iki atomun kovalent bağ ile birleştiği bir element molekülüdür."
              },
              {
                id: "i5",
                molecule: molecules.atom_c,
                correctType: "atom",
                explanation: "Tekil bir karbon atomudur."
              },
              {
                id: "i6",
                molecule: molecules.ion_cl,
                correctType: "ion",
                explanation: "Elektron alarak eksi (-) yükle yüklenmiş bir iyondur (Cl⁻)."
              }
            ]
          }
        ]
      },
      {
        id: "t1_m2",
        title: "Kimyasal Değişimin Göstergeleri",
        description: "Kimyasal değişimlerin göstergelerini keşfet ve soruları yanıtla.",
        type: "mindmap",
        mindmapNodes: [
          {
            id: "renk",
            label: "Renk değişimi",
            color: "bg-red-500",
            question: {
              text: "Aşağıdaki olaylardan hangisi renk değişiminin kimyasal bir tepkimeye işaret ettiğine örnektir?",
              options: [
                { text: "Kesilen elmanın kararması", isCorrect: true, svgId: "apple_brown" },
                { text: "Suya mürekkep damlatılması", isCorrect: false, svgId: "ink_water" }
              ]
            }
          },
          {
            id: "gaz",
            label: "Gaz çıkışı",
            color: "bg-blue-500",
            question: {
              text: "Hangi görseldeki gaz çıkışı kimyasal bir değişimin sonucudur?",
              options: [
                { text: "Suyun kaynaması", isCorrect: false, svgId: "boiling_water" },
                { text: "Karbonata limon sıkılması", isCorrect: true, svgId: "lemon_baking_soda" }
              ]
            }
          },
          {
            id: "kati",
            label: "Katı oluşumu",
            color: "bg-orange-400",
            question: {
              text: "İki sıvı karıştırıldığında katı oluşumu (çökelme) kimyasal değişime kanıttır. Hangisi buna örnektir?",
              options: [
                { text: "Sütten peynir eldesi", isCorrect: true, svgId: "cheese_making" },
                { text: "Suyun donarak buza dönüşmesi", isCorrect: false, svgId: "ice_melting" }
              ]
            }
          },
          {
            id: "isi_isik",
            label: "Işık oluşumu",
            color: "bg-yellow-500",
            question: {
              text: "Hangi olayda açığa çıkan ışık kimyasal bir tepkimenin göstergesidir?",
              options: [
                { text: "Ampulün yanması", isCorrect: false, svgId: "lightbulb" },
                { text: "Odunun yanması", isCorrect: true, svgId: "burning_wood" }
              ]
            }
          },
          {
            id: "koku",
            label: "Koku değişimi",
            color: "bg-teal-500",
            question: {
              text: "Koku değişimi hangi durumda kimyasal bir değişimi gösterir?",
              options: [
                { text: "Yemeğin bozulması (ekşimesi)", isCorrect: true, svgId: "spoiled_food" },
                { text: "Odanın parfüm kokması", isCorrect: false, svgId: "perfume" }
              ]
            }
          },
          {
            id: "enerji",
            label: "Enerji değişimi",
            color: "bg-emerald-500",
            question: {
              text: "Kimyasal tepkimelerde enerji (ısı) değişimi gözlenir. Hangisi kimyasal bir ısı değişimidir?",
              options: [
                { text: "Havai fişek patlaması", isCorrect: true, svgId: "fireworks" },
                { text: "Buzun erimesi", isCorrect: false, svgId: "ice_melting" }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "tema2",
    title: "2. TEMA: MADDENİN TANECİKLİ YAPISI",
    description: "Moleküller, atomlar ve tanecik modelleri.",
    order: 2,
    modules: [
      {
        id: "t2_m1",
        title: "Molekül Modelleri Testi",
        description: "20 farklı molekülün ismini ve formülünü 3 boyutlu modelleriyle eşleştirerek test et.",
        type: "quiz",
        questions: generateMoleculeQuiz()
      }
    ]
  },
  {
    id: "tema3",
    title: "3. TEMA: KİMYASAL TEPKİMELER",
    description: "Kimyasal tepkimeleri modelleme ve denkleştirme.",
    order: 3,
    modules: [
      {
        id: "t3_m1",
        title: "Tepkime Denkleştirme Laboratuvarı",
        description: "3 boyutlu molekül modellerini kullanarak kimyasal tepkimeleri denkleştir ve gerçekleştir.",
        type: "reaction",
        reactions: [
          {
            id: "r1",
            title: "Suyun Sentezi",
            description: "Hidrojen ve Oksijen gazları birleşerek suyu oluşturur. Giren ve çıkan atom sayılarını eşitleyin.",
            reactants: [
              { molecule: molecules.h2, correctCoefficient: 2 },
              { molecule: molecules.o2, correctCoefficient: 1 }
            ],
            products: [
              { molecule: molecules.h2o, correctCoefficient: 2 }
            ]
          },
          {
            id: "r2",
            title: "Amonyak Sentezi (Haber-Bosch)",
            description: "Azot ve Hidrojen gazlarından Amonyak elde edilir. Denklemi denkleştirin.",
            reactants: [
              { molecule: molecules.n2, correctCoefficient: 1 },
              { molecule: molecules.h2, correctCoefficient: 3 }
            ],
            products: [
              { molecule: molecules.nh3, correctCoefficient: 2 }
            ]
          },
          {
            id: "r3",
            title: "Metan Yanması",
            description: "Metan gazı oksijenle yandığında Karbondioksit ve Su açığa çıkar.",
            reactants: [
              { molecule: molecules.ch4, correctCoefficient: 1 },
              { molecule: molecules.o2, correctCoefficient: 2 }
            ],
            products: [
              { molecule: molecules.co2, correctCoefficient: 1 },
              { molecule: molecules.h2o, correctCoefficient: 2 }
            ]
          }
        ]
      }
    ]
  }
];
