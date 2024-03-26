import React, { useEffect } from "react";

export const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container mx-auto pt-20 px-4">
        <h1 className="text-3xl font-bold pt-10  mb-6">利用規約</h1>
        <p>
          この利用規約(以下、「本規約」といいます。)は、本サービス(本サイトを含むものとし、以下、特に両者を区別しません。)の利用条件を定めるものです。本規約は、本サービスを利用するすべてのユーザーに適用されます。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">本規約への同意</h2>
        <p>
          ユーザーは、本サービスを利用することによって、本規約に有効かつ取り消し不能な同意をしたものとみなされます。本規約に同意しないユーザーは、本サービスをご利用いただけません。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">利用登録</h2>
        <p>
          本サービスの利用を希望する方は、本規約に同意の上、からあげアゲイン運営（以下、運営）の定める方法によって利用登録を申請し、運営がこれを承認することによって、本サービスの利用登録をすることができます。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">登録拒否</h2>
        <p>
          運営は、以下のいずれかの事由があると判断した場合、利用登録の申請を承認しないことがあります。運営は登録拒否の理由について一切の開示義務を負いません。
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>虚偽の事項を届け出た場合</li>
          <li>本規約に違反したことがある者からの申請である場合</li>
          <li>その他、運営が利用登録を相当でないと判断した場合</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">未成年による利用</h2>
        <p>
          ユーザーが未成年である場合には、法定代理人の同意を得た上で、本サービスを利用してください。本サービスのご利用にあたり必要となるスマートフォンその他デバイスについても、必ず法定代理人の同意を得た上でご使用下さい。法定代理人の同意を得ずに本サービスのご利用を開始したユーザーが成年に達した場合、未成年者であった間の利用行為を追認したものとみなします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">ログイン情報の管理</h2>
        <p>
          ユーザーは、自己の責任において、本サービスのログイン情報を適切に管理するものとします。ユーザーは、いかなる場合にも、ログイン情報を第三者に譲渡または貸与し、もしくは第三者と共用することはできません。運営は、ログイン情報が第三者によって使用されたことによって生じた損害につき、運営に故意又は重大な過失がある場合を除き、一切の責任を負いません。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">コンテンツのご利用</h2>
        <p>
          運営は、ユーザーに対し、本サービスが提供する文章、画像、動画、音声、音楽、ソフトウェア、プログラム、コードその他のコンテンツについて、本サービスの利用範囲内における私的な利用を許諾します。有償コンテンツについては、運営が定める利用料金の支払が完了した場合に、本サービスの利用範囲内における私的な利用を許諾します。これは、譲渡及び再許諾できない、非独占的な利用権です。この範囲を超えて本サービスが提供するコンテンツを利用することは一切禁止します。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">遅延損害金</h2>
        <p>
          運営に対する金銭債務の支払を遅滞したユーザーは、運営に対し、年14.6％の割合による遅延損害金を支払うものとします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">ユーザーの投稿</h2>
        <p>
          ユーザーは、ユーザーの投稿に含まれる情報を送信することについて適法な権利を有していること、及びユーザーの投稿が第三者の知的財産権（著作権、特許権、実用新案権、商標権、意匠権（それらの権利を取得し、又はそれらの権利につき登録等を出願する権利を含みます。）又はアイデア、ノウハウ等をいい、以下同様とします。）、所有権その他の権利を侵害していないことについて、運営に対し表明し、保証するものとします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">禁止事項</h2>
        <p>
          ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>
            法令、裁判所の判決、決定若しくは命令、又は法令上拘束力のある行政措置に違反する行為又はこれらを助長する行為
          </li>
          <li>犯罪行為に関連する行為</li>
          <li>運営や第三者の知的財産権を侵害する行為</li>
          <li>
            運営や第三者の肖像権、プライバシー、名誉、その他の権利又は利益を侵害する行為
          </li>
          <li>
            運営や第三者のサーバーまたはネットワークに過度の負担をかけたり、その正常な作動を妨害する行為
          </li>
          <li>運営のサービスの運営を妨害するおそれのある行為</li>
          <li>不正アクセスをし、またはこれを試みる行為</li>
          <li>
            逆アセンブル、逆コンパイル、リバースエンジニアリング等によって本サービスのソースコードを解析する行為
          </li>
          <li>
            本サービスに接続しているシステムに権限なく不正にアクセスし又は運営設備に蓄積された情報を不正に書き換え若しくは消去する行為
          </li>
          <li>
            本サービスのウェブサイトやソフトウェアを複製、送信、譲渡、貸与又は改変する行為
          </li>
          <li>
            本サービス上のアカウント又はコンテンツを第三者に有償で貸与、譲渡、売買等をする行為
          </li>
          <li>本サービスによって得られた情報を商業的に利用する行為</li>
          <li>
            運営が意図しない方法によって本サービスに関連して利益を得ることを目的とする行為
          </li>
          <li>
            運営が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為
          </li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>違法、不正又は不当な目的を持って本サービスを利用する行為</li>
          <li>
            本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為
          </li>
          <li>他のユーザーに成りすます行為</li>
          <li>他のユーザーのアカウントを利用する行為</li>
          <li>面識のない異性との出会いを目的とした行為</li>
          <li>反社会的勢力に対して直接または間接に利益を供与する行為</li>
          <li>公序良俗に違反する行為</li>
          <li>
            歩行中、車両運転中、その他本サービスの利用が不適切な状況又は態様において本サービスを利用する行為
          </li>
          <li>その他、運営が不適切と判断する行為</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">換金行為の禁止</h2>
        <p>
          本サービス内で取得した一切のコンテンツまたは本仮想通貨については、手段の如何を問わず、以下の取引を一切禁止します。
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>売買</li>
          <li>
            金銭その他の対価を授受する形でのあらゆる譲渡、譲受、貸与、借用等
          </li>
          <li>その他換金行為に該当すると運営が判断する一切の行為</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">反社会的勢力の排除</h2>
        <p>
          ユーザーは、自らまたは自らの役員が、暴力団、暴力団員、暴力団員でなくなった時から5年を経過しない者、暴力団準構成員、暴力団関係企業、総会屋、社会運動等標ぼうゴロ、特殊知能暴力集団等その他これらに準じる者（以下「暴力団員等」といいます。）であることを表明し、保証するものとします。
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>
            ユーザーが法人その他の団体の場合にあっては、暴力団員等が経営を支配している、または経営に実質的に関与している関係を有すること。
          </li>
          <li>
            自らもしくは第三者の不正の利益を図る目的または第三者に損害を加える目的をもって取引を行うなど、暴力団員等を利用している関係を有すること。
          </li>
          <li>
            暴力団員等に対して資金等を提供し、または便宜を供与するなどの関与をしている関係を有すること。
          </li>
          <li>
            ユーザーが法人その他の団体の場合にあっては、自らの役員または自らの経営に実質的に関与している者が暴力団員等と社会的に非難されるべき関係を有すること。
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">反社会的行為の禁止</h2>
        <p>
          ユーザーは、自らまたは第三者を利用して次の各号のいずれか一にでも該当する行為を行わないことを保証するものとします。
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>暴力的な要求行為</li>
          <li>法的な責任を超えた不当な要求行為</li>
          <li>取引に関して、脅迫的な言動をし、または暴力を用いる行為</li>
          <li>
            風説を流布し、偽計を用い、または威力を用いて、運営の信用を毀損し、または運営の業務を妨害する行為
          </li>
          <li>その他前各号に準ずる行為</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">利用制限</h2>
        <p>
          運営は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。運営は、本条に基づき運営が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>本規約のいずれかの条項に違反した場合</li>
          <li>登録事項に虚偽の事実があることが判明した場合</li>
          <li>金銭債務の不履行があった場合</li>
          <li>運営からの連絡に対し、相当の期間が経過しても返答がない場合</li>
          <li>最終のご利用日から相当期間、本サービスのご利用がない場合</li>
          <li>
            反社会的勢力等であるか、反社会的勢力等との何らかの交流若しくは関与を行っていると運営が判断した場合
          </li>
          <li>その他、運営が本サービスの利用を適当でないと判断した場合</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">本サービスの提供の停止</h2>
        <p>
          運営は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。運営は、この場合にユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>
            本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
          </li>
          <li>
            地震、落雷、火災、停電、天災またはウィルスの蔓延などの不可抗力により、本サービスの提供が困難となった場合
          </li>
          <li>コンピュータまたは通信回線等が事故により停止した場合</li>
          <li>その他、運営が本サービスの提供が困難と判断した場合</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">退会</h2>
        <p>
          ユーザーは、運営の定める手続により、利用登録を抹消し、本サービスから退会できるものとします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">保証の否認</h2>
        <p>
          運営は、本サービスや本サービスが提供するコンテンツに、システムバグや第三者の権利侵害が含まれないことを保証するものではありません。また、安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性を保証するものでもありません。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">免責</h2>
        <p>
          運営は、本サービスに関してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する運営とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。消費者契約に該当する場合であっても、運営は、運営の過失（重過失を除きます。）によってユーザーに生じた損害のうち、ユーザーに直接かつ現実に発生した損害についてのみ賠償責任を負うものとし、また、その賠償額は、本サービスの利用料金の直近1ヶ月分または金1万円のいずれか低い方を上限とします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">サービス内容の変更</h2>
        <p>
          運営は、ユーザーに通知することなく、本サービスの内容を変更したり、本サービスの提供を中止、終了することができるものとします。ユーザーは、本サービスが終了した場合、有料コンテンツを利用する一切の権利を失い、以後、当該有料コンテンツを利用できなくなることについて、あらかじめ、異議なく同意するものとします。運営は、これらによってユーザーに生じた損害について一切の責任を負いません。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">利用規約の変更</h2>
        <p>
          運営は、ユーザーに通知することなく、いつでも本規約を変更することができるものとします。変更後の本規約は、運営ウェブサイトに掲示された時点から効力を生じるものとします。本規約の変更後、本サービスの利用を継続したユーザーは、変更後の本規約に同意したものとみなします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">個人情報の取扱い</h2>
        <p>
          本サービスの利用によって取得するユーザーの個人情報については、運営のプライバシーポリシーに従い適切に取り扱うものとします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">通知または連絡</h2>
        <p>
          ユーザーと運営との間の通知または連絡は、運営の定める方法によって行うものとします。運営は、ユーザーから、運営が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">権利義務の譲渡</h2>
        <p>
          ユーザーは、運営の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">事業譲渡</h2>
        <p>
          運営は本サービスにかかる事業を他社に事業譲渡した場合には、当該事業譲渡に伴い利用契約上の地位、本規約に基づく権利及び義務並びにユーザーの情報を当該事業譲渡の譲受人に譲渡することができるものとします。ユーザーは、かかる譲渡につき予め同意したものとみなします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">適用関係</h2>
        <p>
          本規約は、ユーザーと運営との間の本サービスの利用に関わる一切の関係に適用されるものとします。運営は本サービスに関し、本規約のほか、ご利用にあたってのルールを定めることがあります。これらのルールは、その名称のいかんに関わらず、本規約の一部を構成するものとします。本規約がこれらのルールと矛盾する場合には、これらのルールが優先して適用されるものとします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">分離可能性</h2>
        <p>
          本規約のいずれかの条項又はその一部が無効又は執行不能と判断された場合であっても、当該判断は他の部分に影響を及ぼさず、本規約の残りの部分は、引き続き有効かつ執行力を有するものとします。
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">準拠法・裁判管轄</h2>
        <p>
          本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、運営の本店所在地を管轄する地方裁判所を専属的合意管轄とします。
        </p>
      </div>

      <p className="text-right my-4">制定日: 2024年03月20日</p>
    </>
  );
};
