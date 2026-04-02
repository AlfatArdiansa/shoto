export class ConfigHelper {
  static createConfigFile = async () => {
    const configFile = Bun.file("./data/config.json");

    const defaultConfig = {
      BASE_URL: "https://example.com",
      TITLE: "Alfat's Link Shortener",
    };

    if (!(await configFile.exists())) {
      console.log("Creating config file");
      await configFile.write(JSON.stringify(defaultConfig));
    }
  };
}
