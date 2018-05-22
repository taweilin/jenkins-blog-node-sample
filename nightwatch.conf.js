const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');

const config = {
  "src_folders": [
    "tests/e2e"
  ],
  "output_folder": "reports",
  "selenium": {
    "start_process": true,
    "server_path": seleniumServer.path,
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver": chromedriver.path
    }
  },
  "test_settings": {
    "default": {
      "launch_url": "http://localhost:3000",
      "selenium_port": 4444,
      "selenium_host": "127.0.0.1",
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "chrome-headless": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "chromeOptions": {
          "args": [
            "headless",
            "disable-web-security",
            "ignore-certificate-errors"
          ]
        }
      }
    }
  }
}

module.exports = config;
