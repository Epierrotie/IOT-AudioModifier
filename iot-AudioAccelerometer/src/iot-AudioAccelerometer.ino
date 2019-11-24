/*
 * Project iot-AudioAccelerometer
 * Description:
 * Author:
 * Date:
 */

int light = D2;

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  pinMode(light, OUTPUT);
  delay(50);
  Particle.function("lightItUp", lightItUp);
}

int lightItUp(String extra)
{
  analogWrite(light, HIGH);
  delay(1000);
  analogWrite(light, LOW);
  return (0);
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  // The core of your code will likely live here.
}