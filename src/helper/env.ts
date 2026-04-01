export class EnvHelper {
  static createEnvFile = async () => {
    const envFile = Bun.file("./data/.env");

    if (!(await envFile.exists())) {
      console.log("Creating .env file");
      const envFileContent = `BASE_URL=https://example.com\nTITLE="Alfat's Link Shortener"\n`;
      await envFile.write(envFileContent);
    }
  };
}
