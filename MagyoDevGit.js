const assert = require('assert');
const fs = require('fs');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  // Configurar o navegador Chrome
  const options = new chrome.Options();
  options.addArguments('start-maximized'); // Maximizar a janela do navegador

  // Criar o WebDriver
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  // Inicializar um objeto para armazenar os resultados do teste
  const testResults = {
    assertions: [],
    success: true,
  };

  try {
    // Navegar até o site desejado
    await driver.get('https://github.com/MagyoDev');

    // Aguardar até que a página de resultados seja carregada
    await driver.wait(until.titleIs(), 15000);

  } catch (error) {
    console.error('Erro:', error.message);
    testResults.success = false;
    testResults.error = error.message;
  } finally {
    // Fechar o navegador ao finalizar o teste
    await driver.quit();

    // Gravar os resultados em um arquivo de log
    fs.writeFileSync('test-log.txt', JSON.stringify(testResults, null, 2));
  }
}

// Chamar a função para executar o teste
runTest();
