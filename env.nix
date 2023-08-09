let
    syspkgs = import <nixpkgs> { };
    channel = syspkgs.fetchFromGitHub {
        owner = "NixOS";
        repo = "nixpkgs";

        rev = "0b904cfc7e2e84c5fe4943351602f980e106f225";
        sha256 = "sha256-UDgDer7fjS0thPNZKlOyXEQB+lk6jwZog8RBC1INDPk=";
    };
    helm-plugins-dir = syspkgs.symlinkJoin {
        name = "helm-plugins";
        paths = with syspkgs.kubernetes-helmPlugins; [
        helm-diff
        helm-secrets
    ];
  };

in

with (import channel) {};

stdenv.mkDerivation {
    name = "mjolnir-tv-env";

    buildInputs = with channel; [
        nodejs
        jq

        google-cloud-sdk
        terraform

        kubeval
        kubectl
        kubernetes-helm
        helmfile
        k9s

        act

        figlet
        lolcat
    ];

    shellHook = ''
        figlet "Mjolnir-TV deployment environment!" | lolcat --freq 0.5
        npm install
        export HELM_PLUGINS="${helm-plugins-dir}"

        echo "
            Make sure you have set DigitalOcean configuration in your env
        "
    '';
}