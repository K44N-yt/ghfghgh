export interface Module {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'quiz' | 'interactive' | 'matching';
  content?: string;
  questions?: {
    q: string;
    options: string[];
    answer: number;
  }[];
  models?: {
    name: string;
    formula: string;
    atoms: { element: string; position: [number, number, number] }[];
    bonds: { start: [number, number, number]; end: [number, number, number] }[];
  }[];
  pairs?: {
    left: string;
    right: string;
  }[];
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export const curriculum: Theme[] = [
  {
    id: "tema1",
    title: "1. TEMA: ETKİLEŞİM",
    description: "Kimyasal değişimler, tepkimeler, mol kavramı ve gazların özellikleri.",
    modules: [
      {
        id: "t1_m1",
        title: "Kimyasal Değişimlerin Kanıtları",
        description: "Kimyasal değişimlerin gözlemlenebilir göstergelerini keşfet.",
        type: "lesson",
        content: "Maddenin iç yapısında meydana gelen değişimlere kimyasal değişim denir. Kimyasal değişimin gerçekleştiğini gösteren bazı kanıtlar vardır:\n\n1. **Renk Değişimi:** Bir elmanın kararması veya demirin paslanması.\n2. **Gaz Çıkışı:** Karbonata limon sıkıldığında köpürmesi.\n3. **Isı ve Işık Yayılması:** Odunun yanması.\n4. **Çökelek Oluşumu:** İki berrak çözelti karıştırıldığında katı bir maddenin dibe çökmesi.\n\nBu göstergeler, atomların yeniden düzenlenerek yeni maddeler oluşturduğunun kanıtıdır."
      },
      {
        id: "t1_m2",
        title: "Kimyasal Değişimler Testi",
        description: "Öğrendiklerini test et ve XP kazan.",
        type: "quiz",
        questions: [
          {
            q: "Aşağıdakilerden hangisi kimyasal değişimin gözlemlenebilir bir göstergesi DEĞİLDİR?",
            options: ["Gaz çıkışı", "Renk değişimi", "Hâl değişimi (Erime)", "Çökelek oluşumu"],
            answer: 2
          },
          {
            q: "İki sıvı karıştırıldığında kabın ısınması neyin göstergesidir?",
            options: ["Fiziksel değişimin", "Enerji değişiminin (Kimyasal)", "Buharlaşmanın", "Donmanın"],
            answer: 1
          },
          {
            q: "Aşağıdakilerden hangisi kimyasal bir değişimi kanıtlar niteliktedir?",
            options: ["Buzun erimesi", "Tuzun suda çözünmesi", "Demirin paslanması", "Camın kırılması"],
            answer: 2
          }
        ]
      },
      {
        id: "t1_m3",
        title: "3D Molekül Modelleri",
        description: "Taneciklerin yeniden düzenlenmesini 3 boyutlu olarak incele.",
        type: "interactive",
        models: [
          {
            name: "Su",
            formula: "H₂O",
            atoms: [
              { element: "O", position: [0, 0, 0] },
              { element: "H", position: [0.8, -0.6, 0] },
              { element: "H", position: [-0.8, -0.6, 0] }
            ],
            bonds: [
              { start: [0, 0, 0], end: [0.8, -0.6, 0] },
              { start: [0, 0, 0], end: [-0.8, -0.6, 0] }
            ]
          },
          {
            name: "Karbondioksit",
            formula: "CO₂",
            atoms: [
              { element: "C", position: [0, 0, 0] },
              { element: "O", position: [1.2, 0, 0] },
              { element: "O", position: [-1.2, 0, 0] }
            ],
            bonds: [
              { start: [0, 0, 0], end: [1.2, 0, 0] },
              { start: [0, 0, 0], end: [-1.2, 0, 0] }
            ]
          },
          {
            name: "Metan",
            formula: "CH₄",
            atoms: [
              { element: "C", position: [0, 0, 0] },
              { element: "H", position: [0, 1, 0] },
              { element: "H", position: [0.94, -0.33, 0] },
              { element: "H", position: [-0.47, -0.33, 0.81] },
              { element: "H", position: [-0.47, -0.33, -0.81] }
            ],
            bonds: [
              { start: [0, 0, 0], end: [0, 1, 0] },
              { start: [0, 0, 0], end: [0.94, -0.33, 0] },
              { start: [0, 0, 0], end: [-0.47, -0.33, 0.81] },
              { start: [0, 0, 0], end: [-0.47, -0.33, -0.81] }
            ]
          }
        ]
      },
      {
        id: "t1_m4",
        title: "Tepkime Türleri Eşleştirme",
        description: "Tepkime türlerini doğru açıklamalarla eşleştir.",
        type: "matching",
        pairs: [
          { left: "Çökelme Tepkimesi", right: "İki sulu çözelti karıştırıldığında katı bir maddenin (çökelek) oluşmasıdır." },
          { left: "Asit-Baz Tepkimesi", right: "Asit ve bazın tepkimeye girerek tuz ve genellikle su oluşturmasıdır (Nötralleşme)." },
          { left: "Redoks (İndirgenme-Yükseltgenme)", right: "Elektron alışverişi ile gerçekleşen, yanma ve paslanma gibi tepkimelerdir." },
          { left: "Sentez (Oluşum) Tepkimesi", right: "İki veya daha fazla basit maddenin birleşerek daha karmaşık bir madde oluşturmasıdır." }
        ]
      },
      {
        id: "t1_m5",
        title: "Mol Kavramı",
        description: "Avogadro sayısı ve mol hesaplamaları.",
        type: "lesson",
        content: "Atomlar ve moleküller çok küçük oldukları için onları tek tek saymak imkansızdır. Bu yüzden kimyada 'Mol' birimi kullanılır.\n\n**1 Mol = 6,02 x 10²³ tane tanecik (Avogadro Sayısı)**\n\nNasıl ki 1 düzine 12 adet demekse, 1 mol de 6,02x10²³ adet demektir. Bir maddenin 1 molünün kütlesine 'Mol Kütlesi' (MA) denir ve birimi g/mol'dür.\n\n**Formül:** n = m / MA\n(n: Mol sayısı, m: Kütle, MA: Mol kütlesi)"
      },
      {
        id: "t1_m6",
        title: "Gazların Özellikleri",
        description: "Basınç, hacim, sıcaklık ve madde miktarı ilişkisi.",
        type: "lesson",
        content: "Gazların davranışlarını tanımlayan 4 temel özellik vardır:\n\n- **Basınç (P):** Gaz moleküllerinin kaba çarpma kuvveti (Birim: atm).\n- **Hacim (V):** Gazın kapladığı alan (Bulunduğu kabın hacmini alır, Birim: Litre).\n- **Sıcaklık (T):** Gaz moleküllerinin ortalama kinetik enerjisi (Kelvin cinsinden hesaplanır. T = °C + 273).\n- **Madde Miktarı (n):** Gazın mol sayısı.\n\nİdeal Gaz Denklemi: **P.V = n.R.T** formülü ile bu değişkenler arasındaki ilişki ifade edilir."
      },
      {
        id: "t1_m7",
        title: "Gaz Yasaları Eşleştirme",
        description: "Bilim insanları ve buldukları gaz yasalarını eşleştir.",
        type: "matching",
        pairs: [
          { left: "Boyle Yasası", right: "Sabit sıcaklıkta, bir gazın basıncı ile hacmi ters orantılıdır (P₁V₁ = P₂V₂)." },
          { left: "Charles Yasası", right: "Sabit basınçta, bir gazın hacmi ile mutlak sıcaklığı doğru orantılıdır (V₁/T₁ = V₂/T₂)." },
          { left: "Avogadro Yasası", right: "Sabit sıcaklık ve basınçta, eşit hacimdeki gazların mol sayıları (tanecik sayıları) eşittir." },
          { left: "Gay-Lussac Yasası", right: "Sabit hacimde, bir gazın basıncı ile mutlak sıcaklığı doğru orantılıdır (P₁/T₁ = P₂/T₂)." }
        ]
      }
    ]
  },
  {
    id: "tema2",
    title: "2. TEMA: ÇEŞİTLİLİK",
    description: "Çözünme süreci, çözeltiler ve koligatif özellikler.",
    modules: [
      {
        id: "t2_m1",
        title: "Çözünme Süreci",
        description: "Maddelerin birbiri içinde nasıl çözündüğünü öğren.",
        type: "lesson",
        content: "Çözünme, bir maddenin başka bir madde içinde homojen olarak dağılmasıdır. Temel kural: **'Benzer benzeri çözer.'**\n\n- Polar maddeler polar çözücülerde (örn: Su ve Alkol)\n- Apolar maddeler apolar çözücülerde (örn: Benzen ve İyot) iyi çözünür.\n\nİyonik bileşikler suda çözündüklerinde iyonlarına ayrışırlar (örn: Tuzlu su), bu nedenle elektrik akımını iletirler (Elektrolit çözelti)."
      },
      {
        id: "t2_m2",
        title: "Çözeltiler Testi",
        description: "Çözünme kuralları ve çözelti türleri.",
        type: "quiz",
        questions: [
          {
            q: "Aşağıdaki karışımlardan hangisi elektrolit (elektriği ileten) bir çözeltidir?",
            options: ["Şekerli su", "Tuzlu su", "Alkollü su", "Zeytinyağı-su"],
            answer: 1
          },
          {
            q: "'Benzer benzeri çözer' kuralına göre, apolar bir madde olan İyot (I₂) aşağıdakilerden hangisinde en iyi çözünür?",
            options: ["Su (Polar)", "Karbon tetraklorür (Apolar)", "Amonyak (Polar)", "Hidrojen florür (Polar)"],
            answer: 1
          },
          {
            q: "Aşağıdakilerden hangisi çözünürlüğe etki eden faktörlerden biri DEĞİLDİR?",
            options: ["Sıcaklık", "Basınç (Gazlar için)", "Çözücü ve çözünen cinsi", "Kabın şekli"],
            answer: 3
          }
        ]
      },
      {
        id: "t2_m3",
        title: "Koligatif Özellikler",
        description: "Çözünen maddenin tanecik sayısının çözeltilerin kaynama ve donma noktasına etkisi.",
        type: "lesson",
        content: "Bir çözeltinin, sadece içinde çözünen taneciklerin (iyon veya molekül) derişimine bağlı olan özelliklerine **Koligatif Özellikler** denir.\n\n1. **Kaynama Noktası Yükselmesi:** Saf suya tuz eklendiğinde kaynama noktası 100°C'nin üzerine çıkar. Çözünen madde miktarı arttıkça kaynama noktası daha da yükselir.\n2. **Donma Noktası Düşmesi:** Kışın yollara tuz dökülmesinin sebebi suyun donma noktasını 0°C'nin altına düşürerek buzlanmayı önlemektir.\n\nBu özellikler, çözünen maddenin cinsine değil, tamamen ortamdaki toplam tanecik (iyon/molekül) sayısına bağlıdır."
      }
    ]
  },
  {
    id: "tema3",
    title: "3. TEMA: SÜRDÜRÜLEBİLİRLİK",
    description: "Kimyasal tepkimelerin ekosisteme etkileri ve çevre bilinci.",
    modules: [
      {
        id: "t3_m1",
        title: "Atmosferin Doğası ve Çevre Sorunları",
        description: "Kimyasal tepkimelerin atmosferdeki etkileri.",
        type: "lesson",
        content: "İnsan faaliyetleri sonucu atmosfere salınan gazlar çeşitli çevre sorunlarına yol açar:\n\n- **Sera Etkisi:** CO₂, CH₄ gibi gazların yeryüzünden yansıyan ısıyı tutarak küresel ısınmaya neden olması.\n- **Asit Yağmurları:** Fosil yakıtların yanmasıyla oluşan SO₂ ve NO₂ gazlarının havadaki su buharıyla birleşerek asit (H₂SO₄, HNO₃) olarak yeryüzüne düşmesi. Bu durum tarihi eserlere ve ormanlara zarar verir.\n- **Ozon Tabakasının İncelmesi:** CFC (kloroflorokarbon) gazlarının stratosferdeki ozon (O₃) moleküllerini parçalaması.\n\nSürdürülebilir bir gelecek için yeşil kimya prensiplerini uygulamalı, atom ekonomisini artırmalı ve su ayak izimizi azaltmalıyız."
      },
      {
        id: "t3_m2",
        title: "Çevre ve Sürdürülebilirlik Testi",
        description: "Çevre sorunları ve yeşil kimya bilginizi test edin.",
        type: "quiz",
        questions: [
          {
            q: "Aşağıdaki gazlardan hangisi asit yağmurlarına neden olan temel gazlardan biridir?",
            options: ["Oksijen (O₂)", "Kükürt dioksit (SO₂)", "Azot (N₂)", "Helyum (He)"],
            answer: 1
          },
          {
            q: "Sera etkisine neden olarak küresel ısınmayı en çok artıran gaz aşağıdakilerden hangisidir?",
            options: ["Karbondioksit (CO₂)", "Oksijen (O₂)", "Hidrojen (H₂)", "Argon (Ar)"],
            answer: 0
          },
          {
            q: "Yeşil kimya prensiplerine göre aşağıdakilerden hangisi hedeflenmez?",
            options: ["Atık oluşumunu önlemek", "Yenilenebilir hammaddeler kullanmak", "Atom ekonomisini maksimize etmek", "Zehirli çözücü kullanımını artırmak"],
            answer: 3
          }
        ]
      }
    ]
  }
];
