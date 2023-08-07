// Stations structure:
//   uid?: string;
//   name: string;
//   description: string;
//   avatar: string;
//   cover: string;
//   monthly_fee: number;
//   subscribers?: number;
//   last_stream?: string;
//   uri?: string;

// File URIs:
// https://gettv-srs.testing.gettv.ainur.dev/files/live/superhack_kickoff.mpd
// https://gettv-srs.testing.gettv.ainur.dev/files/live/superhack_layerzero.mpd

const stations = [
  {
    uid: "aaef3af4-0c11-442d-ba50-d936f32a6fbd",
    name: "Superhack",
    description:
      "Superhack is a 24/7 streaming channel for hackers, makers, and builders.",
    avatar: "https://picsum.photos/500",
    cover: "https://picsum.photos/1440/900",
    monthly_fee: 420,
    subscribers: 69,
    last_stream: "2 hours ago",
    uri: "https://gettv-srs.testing.gettv.ainur.dev/files/live/superhack_kickoff.mpd",
  },
  {
    uid: "15fbddf0-714a-4baf-be74-e2c7b5acc217",
    name: "Layer Zero",
    description:
      "Layer Zero is a 24/7 streaming channel for hackers, makers, and builders.",
    avatar: "https://picsum.photos/500",
    cover: "https://picsum.photos/1450/910",
    monthly_fee: 420,
    subscribers: 69,
    last_stream: "4 hours ago",
    uri: "https://gettv-srs.testing.gettv.ainur.dev/files/live/superhack_layerzero.mpd",
  },
];

function main() {
  return { data: stations };
}
