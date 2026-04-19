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
    title: "2. TEMA: MADDENİN TANECİKLİ YAPISI VE HALLERİ",
    description: "Moleküller, atomlar, tanecik modelleri ve hal değişimleri.",
    order: 2,
    modules: [
      {
        id: "t2_m1",
        title: "Molekül Modelleri Testi",
        description: "20 farklı molekülün ismini ve formülünü 3 boyutlu modelleriyle eşleştirerek test et.",
        type: "quiz",
        questions: generateMoleculeQuiz()
      },
      {
        id: "t2_m2",
        title: "Atomun Yapısı Sırları",
        description: "Atomun içindeki temel tanecikleri ve özelliklerini eşleştir.",
        type: "matching",
        pairs: [
          { left: "Pozitif (+) Yüklü Tanecik", right: "Proton", rightType: "text" },
          { left: "Yüksüz (Nötr) Tanecik", right: "Nötron", rightType: "text" },
          { left: "Negatif (-) Yüklü Tanecik", right: "Elektron", rightType: "text" },
          { left: "Proton ve Nötronların Bulunduğu Bölge", right: "Atom Çekirdeği", rightType: "text" },
          { left: "Elektronların Dolandığı Bölge", right: "Yörünge (Katman)", rightType: "text" }
        ]
      },
      {
        id: "t2_m3",
        title: "Hal Değişimleri Eşleştirme",
        description: "Maddenin bir halden diğerine geçiş isimlerini doğru durumlarla eşleştir.",
        type: "matching",
        pairs: [
          { left: "Katıdan Sıvıya Geçiş", right: "Erime", rightType: "text" },
          { left: "Sıvıdan Gaza Geçiş", right: "Buharlaşma", rightType: "text" },
          { left: "Gazdan Sıvıya Geçiş", right: "Yoğuşma", rightType: "text" },
          { left: "Sıvıdan Katıya Geçiş", right: "Donma", rightType: "text" },
          { left: "Katıdan doğrudan Gaza Geçiş", right: "Süblimleşme", rightType: "text" },
          { left: "Gazdan doğrudan Katıya Geçiş", right: "Kırağılaşma", rightType: "text" }
        ]
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
            description: "Metan gazı (CH₄) oksijenle (O₂) yandığında Karbondioksit (CO₂) ve Su (H₂O) açığa çıkar.",
            reactants: [
              { molecule: molecules.ch4, correctCoefficient: 1 },
              { molecule: molecules.o2, correctCoefficient: 2 }
            ],
            products: [
              { molecule: molecules.co2, correctCoefficient: 1 },
              { molecule: molecules.h2o, correctCoefficient: 2 }
            ]
          },
          {
            id: "r4",
            title: "Eten Yanması",
            description: "Eten gazı (C₂H₄) oksijenle yandığında daha fazla Karbondioksit ve Su açığa çıkar.",
            reactants: [
              { molecule: molecules.c2h4, correctCoefficient: 1 },
              { molecule: molecules.o2, correctCoefficient: 3 }
            ],
            products: [
              { molecule: molecules.co2, correctCoefficient: 2 },
              { molecule: molecules.h2o, correctCoefficient: 2 }
            ]
          },
          {
            id: "r5",
            title: "Karbonmonoksit Yanması",
            description: "Zehirli Karbonmonoksit (CO) gazı oksijenle (O₂) tepkimeye girerek Karbondioksit (CO₂) oluşturur.",
            reactants: [
              { molecule: molecules.co, correctCoefficient: 2 },
              { molecule: molecules.o2, correctCoefficient: 1 }
            ],
            products: [
              { molecule: molecules.co2, correctCoefficient: 2 }
            ]
          },
          {
            id: "r6",
            title: "Hidrojen Peroksit Bozunması",
            description: "Hidrojen peroksit (H₂O₂) zamanla veya bir katalizörle hızla Su (H₂O) ve Oksijen gazına (O₂) ayrışır.",
            reactants: [
              { molecule: molecules.h2o2, correctCoefficient: 2 }
            ],
            products: [
              { molecule: molecules.h2o, correctCoefficient: 2 },
              { molecule: molecules.o2, correctCoefficient: 1 }
            ]
          },
          {
            id: "r7",
            title: "Azot Dioksit Sentezi",
            description: "Azot (N₂) ve Oksijen (O₂) gazları yüksek enerjide birleşerek zehirli Azot Dioksit (NO₂) gazını oluşturur.",
            reactants: [
              { molecule: molecules.n2, correctCoefficient: 1 },
              { molecule: molecules.o2, correctCoefficient: 2 }
            ],
            products: [
              { molecule: molecules.no2, correctCoefficient: 2 }
            ]
          }
        ]
      },
      {
        id: "t3_m2",
        title: "Tepkime Türlerini Sınıflandırma",
        description: "Kimyasal tepkimelerin türlerini (Çökelme, Asit-Baz, Sentez, Bozunma vb.) sınıflandırın.",
        type: "reaction-classification",
        reactionClassifications: [
          {
            id: "rc1",
            title: "Tepkime Türünü Belirle",
            description: "Tepkimeyi görsel olarak inceleyin ve doğru tepkime türünü seçin.",
            options: [
              { id: 'precipitation', label: 'Çökelme', colorClass: 'hover:border-blue-500 hover:text-blue-400' },
              { id: 'acid-base', label: 'Asit-Baz (Nötralleşme)', colorClass: 'hover:border-purple-500 hover:text-purple-400' },
              { id: 'synthesis', label: 'Sentez (Oluşum)', colorClass: 'hover:border-emerald-500 hover:text-emerald-400' },
              { id: 'decomposition', label: 'Bozunma (Analiz)', colorClass: 'hover:border-amber-500 hover:text-amber-400' },
              { id: 'redox', label: 'Yanma', colorClass: 'hover:border-red-500 hover:text-red-400' }
            ],
            items: [
              {
                id: "i1",
                equation: "AgNO₃(aq) + NaCl(aq) → AgCl(k) + NaNO₃(aq)",
                reactants: [
                  { formula: "AgNO₃", state: "aq(suda)", color: "bg-slate-700/80 border-slate-400 text-slate-100" },
                  { formula: "NaCl", state: "aq(suda)", color: "bg-slate-700/80 border-slate-400 text-slate-100" }
                ],
                products: [
                  { formula: "AgCl", state: "k(katı)", color: "bg-blue-900 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.8)]" },
                  { formula: "NaNO₃", state: "aq(suda)", color: "bg-slate-700/80 border-slate-400 text-slate-100" }
                ],
                correctType: "precipitation",
                animationType: "precipitation",
                explanation: "Suda çözünmüş iki tuz (AgNO₃ ve NaCl) karıştırıldığında suda çözünmeyen (çöken) katı bir madde (AgCl) oluşturduğu için bu bir Çökelme tepkimesidir."
              },
              {
                id: "i2",
                equation: "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(s)",
                reactants: [
                  { formula: "HCl", state: "aq(asit)", color: "bg-red-900/80 border-red-500 text-red-100" },
                  { formula: "NaOH", state: "aq(baz)", color: "bg-indigo-900/80 border-indigo-500 text-indigo-100" }
                ],
                products: [
                  { formula: "NaCl", state: "aq(tuz)", color: "bg-slate-700/80 border-slate-400 text-slate-100" },
                  { formula: "H₂O", state: "s(sıvı)", color: "bg-cyan-900/80 border-cyan-500 text-cyan-100" }
                ],
                correctType: "acid-base",
                animationType: "acid-base",
                explanation: "Bir asit (HCl) ile bir bazın (NaOH) tepkimeye girerek tuz (NaCl) ve su (H₂O) oluşturduğu Nötralleşme (Asit-Baz) tepkimesidir."
              },
              {
                id: "i3",
                equation: "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) + Isı",
                reactants: [
                  { formula: "CH₄", state: "g(gaz)", color: "bg-slate-700/80 border-slate-400 text-slate-100" },
                  { formula: "O₂", state: "g(gaz)", color: "bg-orange-900 border-orange-500 text-orange-100 shadow-[0_0_15px_rgba(249,115,22,0.8)]" }
                ],
                products: [
                  { formula: "CO₂", state: "g(gaz)", color: "bg-slate-700/80 border-slate-400 text-slate-100" },
                  { formula: "H₂O", state: "g(gaz)", color: "bg-slate-700/80 border-slate-400 text-slate-100" }
                ],
                correctType: "redox",
                animationType: "redox",
                explanation: "Bir maddenin oksijen (O₂) ile hızlı bir şekilde tepkimeye girerek ısı ve ışık yaydığı Yanma tepkimesidir."
              },
              {
                id: "i4",
                equation: "2H₂(g) + O₂(g) → 2H₂O(s)",
                reactants: [
                  { formula: "H₂", state: "g(gaz)", color: "bg-slate-700/80 border-slate-400 text-slate-100" },
                  { formula: "O₂", state: "g(gaz)", color: "bg-slate-700/80 border-slate-400 text-slate-100" }
                ],
                products: [
                  { formula: "H₂O", state: "s(sıvı)", color: "bg-emerald-900/80 border-emerald-500 text-emerald-100" }
                ],
                correctType: "synthesis",
                animationType: "synthesis",
                explanation: "İki veya daha fazla basit maddenin (H₂ ve O₂) birleşerek daha karmaşık bir madde (H₂O) oluşturduğu Sentez (Oluşum) tepkimesidir."
              },
              {
                id: "i5",
                equation: "CaCO₃(k) + Isı → CaO(k) + CO₂(g)",
                reactants: [
                  { formula: "CaCO₃", state: "k(katı)", color: "bg-slate-700/80 border-slate-400 text-slate-100" }
                ],
                products: [
                  { formula: "CaO", state: "k(katı)", color: "bg-slate-700/80 border-slate-400 text-slate-100" },
                  { formula: "CO₂", state: "g(gaz)", color: "bg-slate-700/80 border-slate-400 text-slate-100" }
                ],
                correctType: "decomposition",
                animationType: "decomposition",
                explanation: "Karmaşık bir bileşiğin (CaCO₃) ısı etkisiyle daha basit maddelere (CaO ve CO₂) ayrıştığı Bozunma (Analiz) tepkimesidir."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tema4",
    title: "4. TEMA: MOL KAVRAMI",
    description: "Madde miktarı ölçüsü olan mol kavramı ve kimyasal hesaplamalar.",
    order: 4,
    modules: [
      {
        id: "t4_m1",
        title: "Mol Hesaplama Laboratuvarı",
        description: "Görsel ipuçlarını kullanarak kütle, hacim ve tanecik sayısı üzerinden mol hesaplamaları yapın.",
        type: "mole-calculation",
        moleCalculations: [
          {
            id: "mc1",
            title: "Mol Kavramı",
            description: "Hesaplamaları yapıp doğru seçeneği işaretleyin.",
            items: [
              {
                id: "i1",
                calcType: "mass",
                questionText: "Terazideki 36 gram H₂O (Su) kaç moldür?",
                givenValue: "Kütle: 36 g",
                subText: "(H: 1 g/mol, O: 16 g/mol)",
                options: [
                  { id: "o1", label: "1 mol", isCorrect: false },
                  { id: "o2", label: "2 mol", isCorrect: true },
                  { id: "o3", label: "0.5 mol", isCorrect: false },
                  { id: "o4", label: "4 mol", isCorrect: false }
                ],
                explanation: "H₂O'nun mol kütlesi (Mᴀ) = 2(1) + 16 = 18 g/mol.\nMol (n) = m / Mᴀ\nn = 36 / 18 = 2 mol"
              },
              {
                id: "i2",
                calcType: "particle",
                questionText: "Kutudaki 3.01 x 10²³ tane CH₄ molekülü kaç moldür?",
                givenValue: "3.01 x 10²³ Tane",
                subText: "(Avogadro Sayısı (Nᴀ): 6.02x10²³)",
                options: [
                  { id: "o1", label: "1 mol", isCorrect: false },
                  { id: "o2", label: "2 mol", isCorrect: false },
                  { id: "o3", label: "0.5 mol", isCorrect: true },
                  { id: "o4", label: "0.25 mol", isCorrect: false }
                ],
                explanation: "Mol (n) = Verilen Tanecik Sayısı (N) / Nᴀ\nn = (3.01 x 10²³) / (6.02 x 10²³)\nn = 0.5 mol"
              },
              {
                id: "i3",
                calcType: "volume",
                questionText: "Odadaki Normal Koşullar (N.K.) altındaki balon 11.2 Litre hacim kaplıyor. Bu balonun içindeki He gazı kaç moldür?",
                givenValue: "Hacim: 11.2 L",
                subText: "(1 mol gaz N.K.'da 22.4 L hacim kaplar)",
                options: [
                  { id: "o1", label: "0.5 mol", isCorrect: true },
                  { id: "o2", label: "1 mol", isCorrect: false },
                  { id: "o3", label: "2 mol", isCorrect: false },
                  { id: "o4", label: "5.6 mol", isCorrect: false }
                ],
                explanation: "Mol (n) = Verilen Hacim (V) / 22.4\nn = 11.2 / 22.4\nn = 0.5 mol"
              },
              {
                id: "i4",
                calcType: "mass",
                questionText: "Terazideki 0.2 mol CO₂ gazı tartılırsa kaç gram gelir?",
                givenValue: "Hedef: 0.2 mol",
                subText: "(C: 12 g/mol, O: 16 g/mol)",
                options: [
                  { id: "o1", label: "4.4 g", isCorrect: false },
                  { id: "o2", label: "8.8 g", isCorrect: true },
                  { id: "o3", label: "44 g", isCorrect: false },
                  { id: "o4", label: "22 g", isCorrect: false }
                ],
                explanation: "CO₂'nin mol kütlesi (Mᴀ) = 12 + 2(16) = 44 g/mol.\nKütle (m) = n x Mᴀ\nm = 0.2 x 44 = 8.8 gram"
              }
            ]
          }
        ]
      }
    ]
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
        description: "Gazların temel özelliklerini kavram haritasında keşfedin.",
        type: "mindmap",
        mindmapNodes: [
          {
            id: "sikistirilma",
            label: "Sıkıştırılabilme",
            color: "bg-blue-500",
            question: {
              text: "Gazlar arasındaki boşluklar çok fazladır, bu sayede yüksek basınç altında sıkıştırılabilirler. Hangi görsel sıkıştırılabilme (örneğin bir şırınga içinde) özelliğini gösterir?",
              options: [
                { text: "Gazların sıkıştırılması", isCorrect: true, svgId: "gas_compress" },
                { text: "Katıların sıkıştırılamaması", isCorrect: false, svgId: "solid_block" }
              ]
            }
          },
          {
            id: "yayilma",
            label: "Yayılıcılık",
            color: "bg-pink-500",
            question: {
              text: "Gaz tanecikleri bulundukları ortama hızla yayılarak her yeri kaplarlar. Odaya sıkılan parfümün kokusunun her yerden duyulması hangi olaya en iyi örnektir?",
              options: [
                { text: "Odaya parfüm sıkılması", isCorrect: true, svgId: "perfume" },
                { text: "Su buharının yoğunlaşması", isCorrect: false, svgId: "boiling_water" }
              ]
            }
          },
          {
            id: "genlesme",
            label: "Genleşme",
            color: "bg-red-500",
            question: {
              text: "Bütün gazlar ısıtıldıklarında hacimleri artar (genleşirler). Sıcak hava balonlarının uçması gazların bu özelliği sayesindedir. Hangi görsel genleşmeyi temsil eder?",
              options: [
                { text: "Isıtılan kabın ucundaki balonun şişmesi", isCorrect: true, svgId: "gas_expand" },
                { text: "Buzun erimesi (Katı hal değişimi)", isCorrect: false, svgId: "ice_melting" }
              ]
            }
          },
          {
            id: "homojen",
            label: "Homojen Karışım",
            color: "bg-purple-500",
            question: {
              text: "Gazlar kendi aralarında her oranda ve her zaman tamamen iç içe geçerek homojen karışımlar (çözeltiler) oluştururlar. Atmosfer bunun bir örneğidir. Hangi görsel bunu temsil etmektedir?",
              options: [
                { text: "Farklı gazların iç içe geçip tamamen karışması", isCorrect: true, svgId: "gas_mix" },
                { text: "Zeytinyağı ve suyun heterojen kalması", isCorrect: false, svgId: "oil_water" }
              ]
            }
          },
          {
            id: "basinc",
            label: "Basınç Yapma",
            color: "bg-emerald-500",
            question: {
              text: "Gaz tanecikleri sürekli hareket halindedir ve kabın iç yüzeylerine çarparak her noktaya eşit oranda kuvvet (basınç) uygularlar. Hangi görsel gaz basıncını temsil eder?",
              options: [
                { text: "Taneciklerin kabın çeperlerine çarpması", isCorrect: true, svgId: "gas_pressure" },
                { text: "Elmanın çürümesi", isCorrect: false, svgId: "apple_brown" }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "tema6",
    title: "6. TEMA: ASİTLER VE BAZLAR",
    description: "Asitlerin ve bazların özelliklerini keşfet, türüne göre sınıflandır.",
    order: 6,
    modules: [
      {
        id: "t6_m1",
        title: "Asit mi, Baz mı, Nötr mü?",
        description: "Karşına çıkan moleküllerin asit, baz veya nötr olduğuna karar ver.",
        type: "classification",
        classifications: [
          {
            id: "c_acidbase",
            title: "Asit-Baz Sınıflandırması",
            description: "Kimyasal formülü ve özelliklerini inceleyerek sınıflandırın.",
            options: [
              { id: 'acid', label: 'Asit', colorClass: 'hover:border-red-500 hover:text-red-400' },
              { id: 'base', label: 'Baz', colorClass: 'hover:border-blue-500 hover:text-blue-400' },
              { id: 'neutral', label: 'Nötr', colorClass: 'hover:border-emerald-500 hover:text-emerald-400' }
            ],
            items: [
              {
                id: "ab1",
                molecule: molecules.hcl,
                correctType: "acid",
                explanation: "Hidrojen Klorür (HCl) suda çözündüğünde H⁺ iyonu verir. Kuvvetli bir asittir (Tuz ruhu)."
              },
              {
                id: "ab2",
                molecule: molecules.nh3,
                correctType: "base",
                explanation: "Amonyak (NH₃) yapısında OH olmamasına rağmen suda çözündüğünde OH⁻ iyonu oluşturan zayıf bir bazdır."
              },
              {
                id: "ab3",
                molecule: molecules.h2o,
                correctType: "neutral",
                explanation: "Saf Su (H₂O) asidik veya bazik özellik göstermez. pH değeri tam 7'dir (Nötr)."
              },
              {
                id: "ab4",
                molecule: { name: "Sodyum Hidroksit", formula: "NaOH", atoms: [{element:'Na', position:[0,0,0]}, {element:'O', position:[1.4,0,0]}, {element:'H', position:[2.2,0,0]}], bonds: [{start:[0,0,0], end:[1.4,0,0]}, {start:[1.4,0,0], end:[2.2,0,0]}] },
                correctType: "base",
                explanation: "Sodyum Hidroksit (NaOH) suda çözündüğünde doğrudan OH⁻ iyonu veren kuvvetli bir bazdır (Sud kostik)."
              },
              {
                id: "ab5",
                molecule: { name: "Sodyum Klorür (Tuz)", formula: "NaCl", atoms: [{element:'Na', position:[-0.7,0,0]}, {element:'Cl', position:[1.0,0,0]}], bonds: [{start:[-0.7,0,0], end:[1.0,0,0]}] },
                correctType: "neutral",
                explanation: "Kuvvetli bir asit ile kuvvetli bir bazın tepkimesinden oluşan Nötr bir tuzdur."
              },
              {
                id: "ab6",
                molecule: molecules.hcn,
                correctType: "acid",
                explanation: "Hidrojen Siyanür (HCN) suda H⁺ vererek çözünür. Zayıf asidik özellik gösterir."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tema7",
    title: "7. TEMA: KARIŞIMLAR VE ELEMENTLER",
    description: "Element sembolleri ve karışımları ayırma yöntemleri üzerine eşleştirme oyunları.",
    order: 7,
    modules: [
      {
        id: "t7_m1",
        title: "Periyodik Tablo Dedektifi",
        description: "Element isimlerini doğru sembolleriyle eşleştirerek hafızanı test et.",
        type: "matching",
        pairs: [
          { left: "Sodyum", right: "Na", rightType: "text" },
          { left: "Potasyum", right: "K", rightType: "text" },
          { left: "Demir", right: "Fe", rightType: "text" },
          { left: "Gümüş", right: "Ag", rightType: "text" },
          { left: "Altın", right: "Au", rightType: "text" },
          { left: "Cıva", right: "Hg", rightType: "text" },
          { left: "Kurşun", right: "Pb", rightType: "text" },
          { left: "Bakır", right: "Cu", rightType: "text" }
        ]
      },
      {
        id: "t7_m2",
        title: "Karışımları Ayırma Laboratuvarı",
        description: "Hangi karışımın hangi yöntemle ayrılacağını eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Tuzlu Su (Tuz ve Su)", right: "Basit Damıtma (Buharlaştırma)", rightType: "text" },
          { left: "Kolonya (Alkol ve Su)", right: "Ayrımsal Damıtma (Kaynama Noktası)", rightType: "text" },
          { left: "Kum ve Su", right: "Süzme (Tanecik Boyutu)", rightType: "text" },
          { left: "Zeytinyağı ve Su", right: "Ayırma Hunisi (Yoğunluk Farkı)", rightType: "text" },
          { left: "Demir Tozu ve Kükürt", right: "Mıknatısla Ayırma (Manyetiklik)", rightType: "text" },
          { left: "Buğday ve Saman", right: "Savurma / Eleme (Yoğunluk)", rightType: "text" }
        ]
      }
    ]
  }
];
