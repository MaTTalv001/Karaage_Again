import React, { useEffect } from "react";

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container mx-auto pt-20 p-4">
        <h1 className="text-2xl font-bold pt-10 mb-4">プライバシーポリシー</h1>
        <h2 className="text-xl font-bold mb-4">ユーザーから取得する情報</h2>
        <p>
          からあげアゲイン運営（以下、運営）は、ユーザーから以下の情報を取得します。
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>氏名（ニックネームやペンネームも含む）</li>
          <li>メールアドレス</li>
          <li>写真や動画</li>
          <li>
            外部サービスでユーザーが利用するID、その他外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報
          </li>
          <li>Cookie（クッキー）を用いて生成された識別情報</li>
        </ul>
        <h2 className="text-xl font-bold mb-4">ユーザーの情報を利用する目的</h2>
        <ul className="list-disc ml-8 mb-4">
          <li>
            運営サービスに関する登録の受付、ユーザーの本人確認、認証のため
          </li>
          <li>ユーザーの当サービスの利用履歴を管理するため</li>
          <li>
            運営サービスにおけるユーザーの行動履歴を分析し、運営サービスの維持改善に役立てるため
          </li>
          <li>
            ユーザーからのお問い合わせに対応するためからのお問い合わせに対応するため
          </li>
          <li>
            当サービスにおけるユーザーの行動履歴を分析し、運営サービスの維持改善に役立てるため
          </li>
          <li>当サービスの規約や法令に違反する行為に対応するため</li>
          <li>
            当サービスのサービスの変更、提供中止、終了、契約解除をご連絡するため
          </li>
          <li>当サービスの規約の変更等を通知するため</li>
          <li>以上の他、当サービスの提供、維持、保護及び改善のため</li>
        </ul>

        <h2 className="text-xl font-bold mb-4">安全管理のために講じた措置</h2>
        <p className="mb-4">
          運営が、ユーザーから取得した情報に関して安全管理のために講じた措置につきましては、ご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
        </p>
        <h2 className="text-xl font-bold mb-4">第三者提供</h2>
        <p className="mb-4">
          運営は、ユーザーから取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめユーザーの同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。但し、次の場合は除きます。
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>個人データの取扱いを外部に委託する場合</li>
          <li>当サービスが買収された場合</li>
          <li>
            事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
          </li>
          <li>その他、法律によって合法的に第三者提供が許されている場合</li>
        </ul>
        <h2 className="text-xl font-bold mb-4">アクセス解析ツール</h2>
        <p className="mb-4">
          運営は、ユーザーのアクセス解析のためにGoogleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
          <a
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
            className="text-blue-500 underline"
          >
            https://marketingplatform.google.com/about/analytics/terms/jp/
          </a>
        </p>
        <h2 className="text-xl font-bold mb-4">プライバシーポリシーの変更</h2>
        <p className="mb-4">
          運営は、必要に応じてこのプライバシーポリシーの内容を変更することがあります。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
        </p>

        <p className="text-right mt-4">制定日: 2024年03月20日</p>
      </div>
    </>
  );
};
