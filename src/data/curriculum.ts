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
      },
      {
        id: "t1_m3",
        title: "Etkileşim Türleri",
        description: "Kimyasal türler arası etkileşim türlerini temel sınıflarına göre eşleştirin.",
        type: "matching",
        pairs: [
          { left: "İyonik Bağ", right: "Güçlü Etkileşim", rightType: "text" },
          { left: "Kovalent Bağ", right: "Güçlü Etkileşim ", rightType: "text" },
          { left: "Metalik Bağ", right: "Güçlü Etkileşim  ", rightType: "text" },
          { left: "Hidrojen Bağı", right: "Zayıf Etkileşim", rightType: "text" },
          { left: "Van der Waals Etkileşimleri", right: "Zayıf Etkileşim ", rightType: "text" }
        ]
      },
      {
        id: "t1_m4",
        title: "Fiziksel ve Kimyasal Değişimler",
        description: "Günlük hayattaki olayların fiziksel mi yoksa kimyasal değişim mi olduğunu eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Buzun erimesi", right: "Fiziksel Değişim", rightType: "text" },
          { left: "Demirin paslanması", right: "Kimyasal Değişim", rightType: "text" },
          { left: "Sütten yoğurt elde edilmesi", right: "Kimyasal Değişim ", rightType: "text" },
          { left: "Camın kırılması", right: "Fiziksel Değişim ", rightType: "text" },
          { left: "Gümüşün kararması", right: "Kimyasal Değişim  ", rightType: "text" },
          { left: "Şekerin suda çözünmesi", right: "Fiziksel Değişim  ", rightType: "text" }
        ]
      },
      {
        id: "t1_m5",
        title: "Laboratuvar Malzemeleri",
        description: "Temel kimya laboratuvar malzemelerinin isimlerini kullanımlarıyla eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Sıvıların hacmini hassas ölçmek için", right: "Mezür (Dereceli Silindir)", rightType: "text" },
          { left: "Çözelti hazırlamak ve saklamak için", right: "Balon Joje", rightType: "text" },
          { left: "Titrasyon işlemlerinde sıvı damlatmak için", right: "Büret", rightType: "text" },
          { left: "Sıvıları ısıtmak ve kaynatmak için", right: "Beherglas", rightType: "text" },
          { left: "Az miktardaki sıvıları ısıtmak için", right: "Deney Tüpü", rightType: "text" }
        ]
      },
      {
        id: "t1_m6",
        title: "Kimya Disiplinleri",
        description: "Kimyanın alt bilim dallarını ilgilendikleri çalışma alanlarıyla eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Maddenin kimyasal bileşimini nitel ve nicel analiz eder", right: "Analitik Kimya", rightType: "text" },
          { left: "Canlı organizmalardaki kimyasal süreçleri inceler", right: "Biyokimya", rightType: "text" },
          { left: "Karbon bileşiklerinin yapısını ve tepkimelerini inceler", right: "Organik Kimya", rightType: "text" },
          { left: "Karbon dışındaki mineraller ve metallerle ilgilenir", right: "Anorganik Kimya", rightType: "text" },
          { left: "Kimyasal tepkimelerdeki ısı, iş ve enerji ilişkilerini inceler", right: "Fizikokimya", rightType: "text" }
        ]
      }
      ,{
        id: "t1_mz_1",
        title: "Labirent 1: Fiziksel Değişimler",
        description: "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [{
          id: "mg_t1_mz_1",
          title: "Labirent 1: Fiziksel Değişimler",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Suyun donması nasıl bir değişimdir?","options":[{"id":"1","text":"Fiziksel","isCorrect":true},{"id":"2","text":"Kimyasal","isCorrect":false},{"id":"3","text":"Biyolojik","isCorrect":false},{"id":"4","text":"Nükleer","isCorrect":false}]},{"id":"q2","questionText":"Demirin paslanması nedir?","options":[{"id":"1","text":"Fiziksel","isCorrect":false},{"id":"2","text":"Kimyasal","isCorrect":true},{"id":"3","text":"Radyoaktif","isCorrect":false},{"id":"4","text":"Biyolojik","isCorrect":false}]},{"id":"q3","questionText":"Kağıdın yırtılması?","options":[{"id":"1","text":"Fiziksel","isCorrect":true},{"id":"2","text":"Kimyasal","isCorrect":false},{"id":"3","text":"Elektrik","isCorrect":false},{"id":"4","text":"Biyolojik","isCorrect":false}]}]
        }]
      },
      {
        id: "t1_mz_2",
        title: "Labirent 2: Kimyasal Değişimler+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [{
          id: "mg_t1_mz_2",
          title: "Labirent 2: Kimyasal Değişimler+",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Midenin besinleri sindirmesi?","options":[{"id":"1","text":"Fiziksel","isCorrect":false},{"id":"2","text":"Kimyasal","isCorrect":true},{"id":"3","text":"Radyoaktif","isCorrect":false},{"id":"4","text":"Manyetik","isCorrect":false}]},{"id":"q2","questionText":"Gümüşün kararması?","options":[{"id":"1","text":"Fiziksel","isCorrect":false},{"id":"2","text":"Kimyasal","isCorrect":true},{"id":"3","text":"Simya","isCorrect":false},{"id":"4","text":"Yanılsama","isCorrect":false}]},{"id":"q3","questionText":"Şekerin suda çözünmesi?","options":[{"id":"1","text":"Fiziksel","isCorrect":true},{"id":"2","text":"Kimyasal","isCorrect":false},{"id":"3","text":"Nükleer","isCorrect":false},{"id":"4","text":"Kuantum","isCorrect":false}]}]
        }]
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
      },
      {
        id: "t2_m4",
        title: "Atom Modellerinin Tarihsel Serüveni",
        description: "Geçmişten günümüze atom modellerini ve bu modelleri ortaya atan bilim insanlarını eşleştirin.",
        type: "matching",
        pairs: [
          { left: "İçi dolu berk küre modeli\n(İlk bilimsel model)", right: "Dalton", rightType: "text" },
          { left: "Üzümlü kek modeli\n(Eksi yükler homojen dağılmıştır)", right: "Thomson", rightType: "text" },
          { left: "Çekirdekli atom modeli\n(Altın levha deneyi)", right: "Rutherford", rightType: "text" },
          { left: "Yörüngeli (Katmanlı) atom modeli", right: "Bohr", rightType: "text" },
          { left: "Elektron bulutu modeli", right: "Modern Atom Teorisi", rightType: "text" }
        ]
      },
      {
        id: "t2_m5",
        title: "Fiziksel Haller ve Özellikleri",
        description: "Maddenin dört temel halini belirgin özellikleriyle eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Belirli şekli ve hacmi olan, sıkıştırılamayan haller", right: "Katı Hal", rightType: "text" },
          { left: "Belirli şekli olmayan ama hacmi olan akışkan haller", right: "Sıvı Hal", rightType: "text" },
          { left: "Bulunduğu kabın tamamını kaplayan, sıkıştırılabilen haller", right: "Gaz Hali", rightType: "text" },
          { left: "Evrende en çok bulunan, serbest elektron içeren iyonize hal", right: "Plazma Hali", rightType: "text" },
          { left: "Tanecikler arası boşluğun en fazla olduğu enerjik hal", right: "Gaz Hali ", rightType: "text" }
        ]
      },
      {
        id: "t2_m6",
        title: "Katı Türleri Sınıflandırma",
        description: "Doğadaki katı maddeleri, ait oldukları kristal veya amorf katı türleriyle eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Cam, Plastik, Tereyağı", right: "Amorf Katı", rightType: "text" },
          { left: "Elmas, Grafit, Kuartz", right: "Kovalent Kristal", rightType: "text" },
          { left: "Tuz (NaCl), Gümüş Klorür", right: "İyonik Kristal", rightType: "text" },
          { left: "Altın, Bakır, Demir", right: "Metalik Kristal", rightType: "text" },
          { left: "Buz (H₂O), Kuru Buz (CO₂)", right: "Moleküler Kristal", rightType: "text" }
        ]
      }
      ,{
        id: "t2_mz_1",
        title: "Labirent 1: Katılar ve Sıvılar",
        description: "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [{
          id: "mg_t2_mz_1",
          title: "Labirent 1: Katılar ve Sıvılar",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Maddenin en düzenli hali hangisidir?","options":[{"id":"1","text":"Katı","isCorrect":true},{"id":"2","text":"Sıvı","isCorrect":false},{"id":"3","text":"Gaz","isCorrect":false},{"id":"4","text":"Plazma","isCorrect":false}]},{"id":"q2","questionText":"Buz eridiğinde hangi hale geçer?","options":[{"id":"1","text":"Katı","isCorrect":false},{"id":"2","text":"Sıvı","isCorrect":true},{"id":"3","text":"Gaz","isCorrect":false},{"id":"4","text":"Buhar","isCorrect":false}]},{"id":"q3","questionText":"Sıkıştırılarak küçültülebilen tek hal?","options":[{"id":"1","text":"Katı","isCorrect":false},{"id":"2","text":"Sıvı","isCorrect":false},{"id":"3","text":"Gaz","isCorrect":true},{"id":"4","text":"Jel","isCorrect":false}]}]
        }]
      },
      {
        id: "t2_mz_2",
        title: "Labirent 2: Gazlar ve Plazma+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [{
          id: "mg_t2_mz_2",
          title: "Labirent 2: Gazlar ve Plazma+",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Tanecikler arası boşluğun en fazla olduğu hal?","options":[{"id":"1","text":"Katı","isCorrect":false},{"id":"2","text":"Sıvı","isCorrect":false},{"id":"3","text":"Gaz","isCorrect":true},{"id":"4","text":"Kristal","isCorrect":false}]},{"id":"q2","questionText":"Sıvıdan gaza geçişe ne denir?","options":[{"id":"1","text":"Erime","isCorrect":false},{"id":"2","text":"Donma","isCorrect":false},{"id":"3","text":"Buharlaşma","isCorrect":true},{"id":"4","text":"Süblimleşme","isCorrect":false}]},{"id":"q3","questionText":"Katıdan doğrudan gaza geçiş?","options":[{"id":"1","text":"Erime","isCorrect":false},{"id":"2","text":"Yoğuşma","isCorrect":false},{"id":"3","text":"Süblimleşme","isCorrect":true},{"id":"4","text":"Kırağılaşma","isCorrect":false}]}]
        }]
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
      },
      {
        id: "t3_m3",
        title: "Tepkime Enerjisi ve Hız",
        description: "Kimyasal tepkimelerde enerji, ısı alışverişi ve hız ile ilgili kavramları eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Dışarıdan ısı (enerji) alarak gerçekleşen", right: "Endotermik Tepkime", rightType: "text" },
          { left: "Gerçekleşirken ortama ısı (enerji) veren", right: "Egzotermik Tepkime", rightType: "text" },
          { left: "Tepkimeyi hızlandıran ama değişmeden çıkan", right: "Katalizör", rightType: "text" },
          { left: "Tepkimenin başlaması için gereken minimum enerji", right: "Aktivasyon Enerjisi", rightType: "text" },
          { left: "Girenlerin ürünlere dönüşme hızı", right: "Tepkime Hızı", rightType: "text" }
        ]
      },
      {
        id: "t3_m4",
        title: "Kimyanın Temel Kanunları",
        description: "Kimyanın temel kanunlarını ortaya atan bilim insanlarıyla ve özellikleri ile eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Kütlenin Korunumu Kanunu", right: "A. Lavoisier", rightType: "text" },
          { left: "Sabit Oranlar Kanunu", right: "J. Proust", rightType: "text" },
          { left: "Katlı Oranlar Kanunu", right: "J. Dalton", rightType: "text" },
          { left: "Tepkimelerde toplam kütle değişmez", right: "Lavoisier (Kütle Korunumu)", rightType: "text" },
          { left: "Bileşiği oluşturan elementler arasında belirli bir oran vardır", right: "Proust (Sabit Oranlar)", rightType: "text" }
        ]
      },
      {
        id: "t3_m5",
        title: "Çarpışma Teorisi ve Hız",
        description: "Reaksiyon hızı ve çarpışma teorisiyle ilgili temel kavramları eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Reaksiyonla sonuçlanan atom çarpışması", right: "Etkin Çarpışma", rightType: "text" },
          { left: "En yüksek enerjili kararsız ara ürün", right: "Aktifleşmiş Kompleks", rightType: "text" },
          { left: "Taneciklerin ortalama kinetik enerjisini artırır", right: "Sıcaklık Artışı", rightType: "text" },
          { left: "Aktivasyon enerjisini düşüren tek faktör", right: "Katalizör", rightType: "text" },
          { left: "Artması sadece heterojen tepkimeleri hızlandırır", right: "Temas Yüzeyi", rightType: "text" }
        ]
      },
      {
        id: "t3_m6",
        title: "Tepkime Türleri",
        description: "Denklemleri veya olayları ait oldukları kimyasal tepkime türleriyle eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Oksijen (O₂) gazı ile girilen tepkimeler", right: "Yanma Tepkimesi", rightType: "text" },
          { left: "Küçük moleküllerin birleşip büyük molekül oluşturması", right: "Sentez (Oluşum) Tepkimesi", rightType: "text" },
          { left: "Büyük bir molekülün parçalanarak küçülmesi", right: "Analiz (Ayrışma) Tepkimesi", rightType: "text" },
          { left: "Asit ve Bazın birleşerek tuz ve su oluşturması", right: "Nötralleşme Tepkimesi", rightType: "text" },
          { left: "İki çözelti karıştığında dibe katı çökmesi", right: "Çözünme-Çökelme Tepkimesi", rightType: "text" }
        ]
      }
      ,{
        id: "t3_mz_1",
        title: "Labirent 1: Tepkime Türleri",
        description: "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [{
          id: "mg_t3_mz_1",
          title: "Labirent 1: Tepkime Türleri",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Tepkimelerde girenlerin kütlesi ürünlere eşittir. Bu hangi kanundur?","options":[{"id":"1","text":"Kütlenin Korunumu","isCorrect":true},{"id":"2","text":"Sabit Oranlar","isCorrect":false},{"id":"3","text":"Katlı Oranlar","isCorrect":false},{"id":"4","text":"Avogadro","isCorrect":false}]},{"id":"q2","questionText":"A + B -> AB tepkimesi hangi türdür?","options":[{"id":"1","text":"Sentez","isCorrect":true},{"id":"2","text":"Analiz","isCorrect":false},{"id":"3","text":"Yanma","isCorrect":false},{"id":"4","text":"Nötrleşme","isCorrect":false}]},{"id":"q3","questionText":"Oksijen (O2) ile giren tepkimelere ne ad verilir?","options":[{"id":"1","text":"Yanma","isCorrect":true},{"id":"2","text":"Bozunma","isCorrect":false},{"id":"3","text":"Sentez","isCorrect":false},{"id":"4","text":"Çökelme","isCorrect":false}]}]
        }]
      },
      {
        id: "t3_mz_2",
        title: "Labirent 2: Karışık Tepkimeler+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [{
          id: "mg_t3_mz_2",
          title: "Labirent 2: Karışık Tepkimeler+",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Dışarıdan ısı alarak gerçekleşen tepkimeler?","options":[{"id":"1","text":"Endotermik","isCorrect":true},{"id":"2","text":"Ekzotermik","isCorrect":false},{"id":"3","text":"İzotermik","isCorrect":false},{"id":"4","text":"Hızlı","isCorrect":false}]},{"id":"q2","questionText":"Asit ve Baz birleşirse ne oluşur?","options":[{"id":"1","text":"Tuz ve Su","isCorrect":true},{"id":"2","text":"Sadece Gaz","isCorrect":false},{"id":"3","text":"Patlama","isCorrect":false},{"id":"4","text":"Plazma","isCorrect":false}]},{"id":"q3","questionText":"Aktivasyon enerjisini düşüren madde?","options":[{"id":"1","text":"Katalizör","isCorrect":true},{"id":"2","text":"Asit","isCorrect":false},{"id":"3","text":"Su","isCorrect":false},{"id":"4","text":"Isı","isCorrect":false}]}]
        }]
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
      },
      {
        id: "t4_m2",
        title: "Kavram Avcısı: Mol ve Kütle",
        description: "Mol kavramında kullanılan temel terimleri ait oldukları tanımlar veya değerlerle eşleştir.",
        type: "matching",
        pairs: [
          { left: "6.02x10²³ tanecik (Avogadro Sayısı)", right: "Nᴀ", rightType: "text" },
          { left: "1 mol maddenin gram kütlesi", right: "Molar Kütle", rightType: "text" },
          { left: "1 tane C-12 atomunun kütlesinin 1/12'si", right: "Atomik Kütle Birimi (akb)", rightType: "text" },
          { left: "N.K.'da 1 mol gazın hacmi", right: "22.4 Litre", rightType: "text" },
          { left: "Oda koşullarında 1 mol gazın hacmi", right: "24.5 Litre", rightType: "text" }
        ]
      },
      {
        id: "t4_m3",
        title: "Kimyasal Formüllerin Sırrı",
        description: "Farklı kimyasal formül türlerinin ifade ettiği kavramları eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Bileşikteki elementlerin türünü ve en sade oranını verir", right: "Basit (Empirik) Formül", rightType: "text" },
          { left: "Bileşiğin molekülündeki gerçek atom sayılarını verir", right: "Molekül Formülü", rightType: "text" },
          { left: "Atomların birbirine nasıl bağlandığını (açık yapısını) gösterir", right: "Yapı (Açık) Formülü", rightType: "text" },
          { left: "Su (H₂O) için hem basit hem molekül formülüdür", right: "Aynı Formül", rightType: "text" }
        ]
      },
      {
        id: "t4_m4",
        title: "İzotop ve Temel Tanecikler",
        description: "Atomun yapısındaki temel tanecikleri ve izotop / izoton atomları eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Çekirdek yükü (Atomun kimliği)", right: "Atom Numarası (Proton)", rightType: "text" },
          { left: "Proton + Nötron sayısı (Nükleon sayısı)", right: "Kütle Numarası", rightType: "text" },
          { left: "Protonları aynı, nötronları farklı atomlar", right: "İzotop Atomlar", rightType: "text" },
          { left: "Nötronları aynı, protonları farklı atomlar", right: "İzoton Atomlar", rightType: "text" },
          { left: "Kütle numaraları aynı, atom numaraları farklı", right: "İzobar Atomlar", rightType: "text" }
        ]
      },
      {
        id: "t4_m5",
        title: "Mol Terimleri ve Birimleri",
        description: "Mol kavramında kullanılan terimleri (atom-gram vb.) ve ifadeleri eşleştirin.",
        type: "matching",
        pairs: [
          { left: "1 mol element / atom ifade eder", right: "Atom-gram", rightType: "text" },
          { left: "1 mol kovalent bağlı bileşik ifade eder", right: "Molekül-gram", rightType: "text" },
          { left: "1 mol iyonik bağlı bileşik ifade eder", right: "Formül-gram", rightType: "text" },
          { left: "1 mol yüklü tanecik ifade eder", right: "İyon-gram", rightType: "text" },
          { left: "1 mol maddenin içerdiği tanecik sayısı", right: "Avogadro Sayısı", rightType: "text" }
        ]
      },
      {
        id: "t4_m6",
        title: "Mol Formülleri ve Simgeleri",
        description: "Kimyasal hesaplamalarda kullanılan temel simgeleri ve ne anlama geldiklerini eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Formüllerdeki küçük 'm' (n = m/Ma)", right: "Kütle (gram)", rightType: "text" },
          { left: "Formüllerdeki 'Ma' veya 'Mw' (n = m/Ma)", right: "Molar Kütle", rightType: "text" },
          { left: "Formüllerdeki büyük 'N' (n = N/Na)", right: "Tanecik Sayısı", rightType: "text" },
          { left: "N.K. (Normal Koşullar) hacim değeri", right: "22.4 Litre", rightType: "text" },
          { left: "O.K. (Oda Koşulları) hacim değeri", right: "24.5 Litre", rightType: "text" }
        ]
      }
      ,{
        id: "t4_mz_1",
        title: "Labirent 1: Mol Hesaplamaları",
        description: "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [{
          id: "mg_t4_mz_1",
          title: "Labirent 1: Mol Hesaplamaları",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"1 mol maddenin içerdiği tanecik sayısına ne ad verilir?","options":[{"id":"1","text":"Avogadro Sayısı","isCorrect":true},{"id":"2","text":"Rutherford Say","isCorrect":false},{"id":"3","text":"Bohr Sayısı","isCorrect":false},{"id":"4","text":"Kütle","isCorrect":false}]},{"id":"q2","questionText":"Normal Koşullarda 1 mol gaz kaç litredir?","options":[{"id":"1","text":"22.4 L","isCorrect":true},{"id":"2","text":"24.5 L","isCorrect":false},{"id":"3","text":"10 L","isCorrect":false},{"id":"4","text":"11.2 L","isCorrect":false}]},{"id":"q3","questionText":"1 mol C atomu kaç gramdır? (C=12)","options":[{"id":"1","text":"12 gram","isCorrect":true},{"id":"2","text":"1 gram","isCorrect":false},{"id":"3","text":"6 gram","isCorrect":false},{"id":"4","text":"24 gram","isCorrect":false}]}]
        }]
      },
      {
        id: "t4_mz_2",
        title: "Labirent 2: Mol Uzmanı+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [{
          id: "mg_t4_mz_2",
          title: "Labirent 2: Mol Uzmanı+",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Oda Koşullarında 1 mol gaz kaç litre hacim kaplar?","options":[{"id":"1","text":"24.5 L","isCorrect":true},{"id":"2","text":"22.4 L","isCorrect":false},{"id":"3","text":"11.2 L","isCorrect":false},{"id":"4","text":"44.8 L","isCorrect":false}]},{"id":"q2","questionText":"Bir bileşikteki en sade element oranını gösteren formül?","options":[{"id":"1","text":"Basit Formül","isCorrect":true},{"id":"2","text":"Gerçek Formül","isCorrect":false},{"id":"3","text":"Molekül Formül","isCorrect":false},{"id":"4","text":"Kütle","isCorrect":false}]},{"id":"q3","questionText":"n = m / Ma formülündeki 'm' neyi ifade eder?","options":[{"id":"1","text":"Kütle (Gram)","isCorrect":true},{"id":"2","text":"Mol","isCorrect":false},{"id":"3","text":"Hacim","isCorrect":false},{"id":"4","text":"Basınç","isCorrect":false}]}]
        }]
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
      },
      {
        id: "t5_m2",
        title: "Gaz Kanunları Dedektifi",
        description: "Gaz kanunlarını ait oldukları formüllerle ve sabit tutulan değerlerle eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Boyle Kanunu\n(Sabit T ve n)", right: "P₁·V₁ = P₂·V₂", rightType: "text" },
          { left: "Charles Kanunu\n(Sabit P ve n)", right: "V₁/T₁ = V₂/T₂", rightType: "text" },
          { left: "Gay-Lussac Kanunu\n(Sabit V ve n)", right: "P₁/T₁ = P₂/T₂", rightType: "text" },
          { left: "Avogadro Kanunu\n(Sabit P ve T)", right: "V₁/n₁ = V₂/n₂", rightType: "text" },
          { left: "İdeal Gaz Denklemi\n(Tümü değişebilir)", right: "P·V = n·R·T", rightType: "text" }
        ]
      },
      {
        id: "t5_m3",
        title: "Basınç ve Hacim Dönüşümleri",
        description: "Gaz hesaplamalarında kullanılan temel ölçü birimlerini birbirleri cinsinden eşleştirin.",
        type: "matching",
        pairs: [
          { left: "1 Atmosfer (atm) basınç", right: "76 cmHg (760 mmHg)", rightType: "text" },
          { left: "1 Torr basınç", right: "1 mmHg", rightType: "text" },
          { left: "Mutlak Sıfır Noktası (0 Kelvin)", right: "-273.15 °C", rightType: "text" },
          { left: "1 Litre (L) hacim", right: "1000 mL", rightType: "text" },
          { left: "Doğadaki Standart Şartlar (Sıcaklık ve Basınç)", right: "25 °C ve 1 atm", rightType: "text" }
        ]
      },
      {
        id: "t5_m4",
        title: "Kinetik Teori Kavramları",
        description: "Gazların özelliklerini ve davranışlarını açıklayan Kinetik Teori kavramlarını eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Gazın başka bir gaz içinde yayılması", right: "Difüzyon", rightType: "text" },
          { left: "Gazın küçük bir delikten boşluğa yayılması", right: "Efüzyon (Dışarı Sızma)", rightType: "text" },
          { left: "Gazların davranışlarını matematiksel modellerle açıklayan teori", right: "Kinetik Teori", rightType: "text" },
          { left: "Ortalama kinetik enerjinin bağlı olduğu tek değişken", right: "Mutlak Sıcaklık (Kelvin)", rightType: "text" },
          { left: "Kinetik teorinin varsaydığı tanecikler arası kuvvet", right: "Sıfır kabul edilir", rightType: "text" }
        ]
      },
      {
        id: "t5_m5",
        title: "Atmosferdeki Gazlar ve Etkileri",
        description: "Atmosferde bulunan gazları ve dünya üzerinde yarattıkları çevresel etkileri eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Karbondioksit (CO₂) gazının atmosferde aşırı birikmesi", right: "Sera Etkisi (Küresel Isınma)", rightType: "text" },
          { left: "SO₂ (Kükürtdioksit) ve NO₂ (Azotdioksit) gazlarının suyla birleşmesi", right: "Asit Yağmurları", rightType: "text" },
          { left: "Güneşin zararlı UV ışınlarını süzen gaz bulutu", right: "Ozon Tabakası (O₃)", rightType: "text" },
          { left: "Klima ve buzdolaplarında kullanılan çevreye zararlı eski gazlar", right: "CFC (Kloroflorokarbon)", rightType: "text" },
          { left: "Atmosferin %78'ini oluşturan yaşamın temel gazı", right: "Azot (N₂) Gazı", rightType: "text" }
        ]
      },
      {
        id: "t5_m6",
        title: "Gaz Yasaları ve Kanunları",
        description: "Gazların hacim, sıcaklık, basınç ve mol sayısıyla olan ilişkilerini (yasaları) eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Basınç ve Hacim Ters Orantılıdır (P-V)", right: "Boyle Yasası", rightType: "text" },
          { left: "Hacim ve Mutlak Sıcaklık Doğru Orantılıdır (V-T)", right: "Charles Yasası", rightType: "text" },
          { left: "Basınç ve Mutlak Sıcaklık Doğru Orantılıdır (P-T)", right: "Gay-Lussac Yasası", rightType: "text" },
          { left: "Hacim ve Mol Sayısı Doğru Orantılıdır (V-n)", right: "Avogadro Yasası", rightType: "text" },
          { left: "Tüm gazların uyduğu varsayılan formül (PV=nRT)", right: "İdeal Gaz Denklemi", rightType: "text" }
        ]
      }
      ,{
        id: "t5_mz_1",
        title: "Labirent 1: Gaz Yasaları",
        description: "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [{
          id: "mg_t5_mz_1",
          title: "Labirent 1: Gaz Yasaları",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Gazların basıncını ölçen alet?","options":[{"id":"1","text":"Barometre","isCorrect":true},{"id":"2","text":"Termometre","isCorrect":false},{"id":"3","text":"Altametre","isCorrect":false},{"id":"4","text":"Voltmetre","isCorrect":false}]},{"id":"q2","questionText":"Gaz yasalarında sıcaklık birimi nedir?","options":[{"id":"1","text":"Kelvin","isCorrect":true},{"id":"2","text":"Celsius","isCorrect":false},{"id":"3","text":"Fahrenheit","isCorrect":false},{"id":"4","text":"Newton","isCorrect":false}]},{"id":"q3","questionText":"Basınç ve Hacim arasındaki ilişkiyi kim buldu?","options":[{"id":"1","text":"Boyle","isCorrect":true},{"id":"2","text":"Charles","isCorrect":false},{"id":"3","text":"Avogadro","isCorrect":false},{"id":"4","text":"Dalton","isCorrect":false}]}]
        }]
      },
      {
        id: "t5_mz_2",
        title: "Labirent 2: Kinetik Uzmanlık+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [{
          id: "mg_t5_mz_2",
          title: "Labirent 2: Kinetik Uzmanlık+",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"PV = nRT denklemindeki R nedir?","options":[{"id":"1","text":"İdeal Gaz Sabiti","isCorrect":true},{"id":"2","text":"Basınç","isCorrect":false},{"id":"3","text":"Direnç","isCorrect":false},{"id":"4","text":"Hız","isCorrect":false}]},{"id":"q2","questionText":"0 Kelvin (Mutlak sıfır) kaç santigrat derecedir?","options":[{"id":"1","text":"-273","isCorrect":true},{"id":"2","text":"0","isCorrect":false},{"id":"3","text":"100","isCorrect":false},{"id":"4","text":"-100","isCorrect":false}]},{"id":"q3","questionText":"Gazların dar bir delikten sızmasına ne denir?","options":[{"id":"1","text":"Efüzyon","isCorrect":true},{"id":"2","text":"Difüzyon","isCorrect":false},{"id":"3","text":"Erime","isCorrect":false},{"id":"4","text":"Kaynama","isCorrect":false}]}]
        }]
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
      },
      {
        id: "t6_m2",
        title: "İndikatör Renk Eşleştirme",
        description: "Asit ve baz ortamlarında indikatörlerin (belirteçlerin) hangi rengi aldığını deneyerek bulun.",
        type: "matching",
        pairs: [
          { left: "Turnusol Kağıdı (Asit Ortamı)", right: "Kırmızı", rightType: "text" },
          { left: "Turnusol Kağıdı (Baz Ortamı)", right: "Mavi", rightType: "text" },
          { left: "Fenolftalein (Asit Ortamı)", right: "Renksiz", rightType: "text" },
          { left: "Fenolftalein (Baz Ortamı)", right: "Pembe", rightType: "text" },
          { left: "Metil Turuncu (Asit Ortamı)", right: "Kırmızı ", rightType: "text" },
          { left: "Metil Turuncu (Baz Ortamı)", right: "Sarı", rightType: "text" }
        ]
      },
      {
        id: "t6_m3",
        title: "Gündelik Hayattaki Asitler ve Bazlar",
        description: "Evimizde veya çevremizde bulunan maddeleri içerdikleri asit veya bazlarla eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Limon, Portakal, Turunçgiller", right: "Sitrik Asit", rightType: "text" },
          { left: "Sirke", right: "Asetik Asit", rightType: "text" },
          { left: "Yoğurt, Süt, Ayran", right: "Laktik Asit", rightType: "text" },
          { left: "Mide Özsuyu (Tuz Ruhu)", right: "Hidroklorik Asit", rightType: "text" },
          { left: "Sabun, Çamaşır Suyu, Lavabo Açıcı", right: "Sodyum Hidroksit (Baz)", rightType: "text" },
          { left: "Gazlı İçecekler", right: "Karbonik Asit", rightType: "text" }
        ]
      },
      {
        id: "t6_m4",
        title: "pH Cetveli Dedektifi",
        description: "Verilen pH değerlerini ortamın asit-baz özellikleriyle eşleştirin.",
        type: "matching",
        pairs: [
          { left: "pH değeri 7'den küçük (pH < 7)", right: "Asidik Ortam", rightType: "text" },
          { left: "pH değeri tam 7 (pH = 7)", right: "Nötr Ortam", rightType: "text" },
          { left: "pH değeri 7'den büyük (pH > 7)", right: "Bazik Ortam", rightType: "text" },
          { left: "pH = 1", right: "Kuvvetli Asit", rightType: "text" },
          { left: "pH = 13", right: "Kuvvetli Baz", rightType: "text" }
        ]
      },
      {
        id: "t6_m5",
        title: "Yaygın Tuzlar ve Kullanım Alanları",
        description: "Günlük hayatta sıkça kullandığımız tuzları (NaCl vb.) yaygın isimleriyle eşleştirin.",
        type: "matching",
        pairs: [
          { left: "NaCl (Sodyum klorür)", right: "Sofra / Yemek Tuzu", rightType: "text" },
          { left: "NaHCO₃ (Sodyum bikarbonat)", right: "Yemek Sodası (Kabartma)", rightType: "text" },
          { left: "Na₂CO₃ (Sodyum karbonat)", right: "Çamaşır Sodası", rightType: "text" },
          { left: "CaCO₃ (Kalsiyum karbonat)", right: "Kireç Taşı (Mermer)", rightType: "text" },
          { left: "NH₄Cl (Amonyum klorür)", right: "Nişadır (Pil yapımı)", rightType: "text" }
        ]
      },
      {
        id: "t6_m6",
        title: "Yaygın Asit ve Baz Formülleri",
        description: "Sanayide veya halk arasında bilinen yaygın asit ve bazları formülleriyle eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Sülfürik Asit (Zaç Yağı)", right: "H₂SO₄", rightType: "text" },
          { left: "Nitrik Asit (Kezzap)", right: "HNO₃", rightType: "text" },
          { left: "Hidroklorik Asit (Tuz Ruhu)", right: "HCl", rightType: "text" },
          { left: "Sodyum Hidroksit (Sud Kostik)", right: "NaOH", rightType: "text" },
          { left: "Potasyum Hidroksit (Potas Kostik)", right: "KOH", rightType: "text" }
        ]
      }
      ,{
        id: "t6_mz_1",
        title: "Labirent 1: pH Özellikleri",
        description: "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [{
          id: "mg_t6_mz_1",
          title: "Labirent 1: pH Özellikleri",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Suda çözündüğünde H+ iyonu veren maddeler?","options":[{"id":"1","text":"Asit","isCorrect":true},{"id":"2","text":"Baz","isCorrect":false},{"id":"3","text":"Tuz","isCorrect":false},{"id":"4","text":"Metal","isCorrect":false}]},{"id":"q2","questionText":"pH 7'den büyükse ortam nedir?","options":[{"id":"1","text":"Bazik","isCorrect":true},{"id":"2","text":"Asidik","isCorrect":false},{"id":"3","text":"Nötr","isCorrect":false},{"id":"4","text":"Metalik","isCorrect":false}]},{"id":"q3","questionText":"Tuz ruhu formülü nedir?","options":[{"id":"1","text":"HCl","isCorrect":true},{"id":"2","text":"HNO3","isCorrect":false},{"id":"3","text":"H2SO4","isCorrect":false},{"id":"4","text":"NaOH","isCorrect":false}]}]
        }]
      },
      {
        id: "t6_mz_2",
        title: "Labirent 2: Asit Baz Formülleri+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [{
          id: "mg_t6_mz_2",
          title: "Labirent 2: Asit Baz Formülleri+",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Turnusol kağıdını kırmızıya çeviren maddeler?","options":[{"id":"1","text":"Asit","isCorrect":true},{"id":"2","text":"Baz","isCorrect":false},{"id":"3","text":"Tuz","isCorrect":false},{"id":"4","text":"Saf su","isCorrect":false}]},{"id":"q2","questionText":"Sofra tuzunun formülü?","options":[{"id":"1","text":"NaCl","isCorrect":true},{"id":"2","text":"NaF","isCorrect":false},{"id":"3","text":"CaCl2","isCorrect":false},{"id":"4","text":"KMnO4","isCorrect":false}]},{"id":"q3","questionText":"Akü asidi (Zaç yağı) nedir?","options":[{"id":"1","text":"H2SO4","isCorrect":true},{"id":"2","text":"HCl","isCorrect":false},{"id":"3","text":"HNO3","isCorrect":false},{"id":"4","text":"H2O","isCorrect":false}]}]
        }]
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
      },
      {
        id: "t7_m3",
        title: "Karışım Türleri Sınıflandırma",
        description: "Karışım örneklerini ait oldukları karışım (homojen veya heterojen) türüyle eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Hava, Kolonya, Şekerli Su", right: "Homojen Karışım (Çözelti)", rightType: "text" },
          { left: "Zeytinyağı - Su karışımı", right: "Heterojen (Emülsiyon)", rightType: "text" },
          { left: "Kum - Su, Tebeşir Tozu - Su", right: "Heterojen (Süspansiyon)", rightType: "text" },
          { left: "Duman, Sis, Deodorant Sprey", right: "Heterojen (Aerosol)", rightType: "text" },
          { left: "Çelik, Pirinç, Lehim (Alaşım)", right: "Homojen (Katı-Katı Çözelti)", rightType: "text" },
          { left: "Kan, Süt", right: "Heterojen (Kolloid)", rightType: "text" }
        ]
      },
      {
        id: "t7_m4",
        title: "Periyodik Tablo Toplulukları",
        description: "Periyodik tablodaki bazı element gruplarının sahip oldukları özel isimleri eşleştirin.",
        type: "matching",
        pairs: [
          { left: "1A Grubu Elementleri", right: "Alkali Metaller", rightType: "text" },
          { left: "2A Grubu Elementleri", right: "Toprak Alkali Metaller", rightType: "text" },
          { left: "3A Grubu Elementleri", right: "Toprak Metalleri", rightType: "text" },
          { left: "7A Grubu Elementleri", right: "Halojenler", rightType: "text" },
          { left: "8A Grubu Elementleri", right: "Soygazlar (Asal Gazlar)", rightType: "text" },
          { left: "B Grubu Elementleri", right: "Geçiş Metalleri", rightType: "text" }
        ]
      },
      {
        id: "t7_m5",
        title: "Bileşik Adlandırma Kuralları",
        description: "Sık kullanılan kimyasal bileşiklerin formülleriyle adlarını eşleştirin.",
        type: "matching",
        pairs: [
          { left: "NaCl", right: "Sodyum klorür", rightType: "text" },
          { left: "H₂O", right: "Dihidrojen monoksit", rightType: "text" },
          { left: "CO₂", right: "Karbon dioksit", rightType: "text" },
          { left: "N₂O₅", right: "Diazot pentaoksit", rightType: "text" },
          { left: "Al₂O₃", right: "Alüminyum oksit", rightType: "text" },
          { left: "CCl₄", right: "Karbon tetraklorür", rightType: "text" }
        ]
      },
      {
        id: "t7_m6",
        title: "Alaşım Türleri ve İçerikleri",
        description: "Günlük hayatta ve sanayide kullanılan homojen katı karışımlarının (alaşımların) temel bileşenlerini eşleştirin.",
        type: "matching",
        pairs: [
          { left: "Demir (Fe) ve Karbon (C)", right: "Çelik", rightType: "text" },
          { left: "Bakır (Cu) ve Çinko (Zn)", right: "Pirinç", rightType: "text" },
          { left: "Bakır (Cu) ve Kalay (Sn)", right: "Tunç / Bronz", rightType: "text" },
          { left: "Kurşun (Pb) ve Kalay (Sn)", right: "Lehim (Elektrikçilik)", rightType: "text" },
          { left: "Cıva (Hg) ile bir başka metalin alaşımı", right: "Amalgam (Diş dolgusu)", rightType: "text" }
        ]
      },
      {
        id: "t7_mz_1",
        title: "Labirent 1: Karışımlar",
        description: "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [{
          id: "mg_t7_mz_1",
          title: "Labirent 1: Karışımlar",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Her tarafında aynı özelliği gösteren karışımlar?","options":[{"id":"1","text":"Homojen","isCorrect":true},{"id":"2","text":"Heterojen","isCorrect":false},{"id":"3","text":"Kolloid","isCorrect":false},{"id":"4","text":"Süspansiyon","isCorrect":false}]},{"id":"q2","questionText":"Zeytinyağı ve su nasıl bir karışımdır?","options":[{"id":"1","text":"Emülsiyon","isCorrect":true},{"id":"2","text":"Çözelti","isCorrect":false},{"id":"3","text":"Alaşım","isCorrect":false},{"id":"4","text":"Süspansiyon","isCorrect":false}]},{"id":"q3","questionText":"Kum ve suyu birbirinden ayırma yöntemi?","options":[{"id":"1","text":"Süzme","isCorrect":true},{"id":"2","text":"Damıtma","isCorrect":false},{"id":"3","text":"Mıknatıs","isCorrect":false},{"id":"4","text":"AyırmaHunisi","isCorrect":false}]}]
        }]
      },
      {
        id: "t7_mz_2",
        title: "Labirent 2: Alaşımlar ve Ayırma+",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [{
          id: "mg_t7_mz_2",
          title: "Labirent 2: Alaşımlar ve Ayırma+",
          description: "Robot ile kaç!",
          questions: [{"id":"q1","questionText":"Metalleri eritip karıştırarak elde edilen karışım?","options":[{"id":"1","text":"Alaşım","isCorrect":true},{"id":"2","text":"Çözücü","isCorrect":false},{"id":"3","text":"Aerosol","isCorrect":false},{"id":"4","text":"Kolloid","isCorrect":false}]},{"id":"q2","questionText":"Kan, deniz suyu ve ayran nasıl karışımdır?","options":[{"id":"1","text":"Heterojen","isCorrect":true},{"id":"2","text":"Homojen","isCorrect":false},{"id":"3","text":"Saf","isCorrect":false},{"id":"4","text":"Element","isCorrect":false}]},{"id":"q3","questionText":"Demir tozu ve kükürt tozunu en kolay nasıl ayırırız?","options":[{"id":"1","text":"Mıknatısla","isCorrect":true},{"id":"2","text":"Suya atıp","isCorrect":false},{"id":"3","text":"Isıtarak","isCorrect":false},{"id":"4","text":"Damıtarak","isCorrect":false}]}]
        }]
      }
    ]
  }
];
