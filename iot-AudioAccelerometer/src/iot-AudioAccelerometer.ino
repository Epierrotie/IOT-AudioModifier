/*
 * Project iot-AudioAccelerometer
 * Description:
 * Author:
 * Date:
 */

#include "SparkFunMMA8452Q.h"

MMA8452Q accel;
int button = D2;
bool change = false;

void setup() {
  Serial.begin(9600);

  accel.begin(SCALE_2G, ODR_1);
  Particle.function("twitterPost", twitterPost);
  pinMode(button, INPUT_PULLUP);
  attachInterrupt(button, handleButton, RISING);
}

int twitterPost(String title) {
  Particle.publish("onSongChange", title);
  return (0);
}

int handleButton() {
  change = true;
}

void loop() {
  String str;

  if (accel.available())
  {
      accel.read();

    str = String(accel.cx, 4) + ":" + String(accel.cy, 4) + ":" + String(accel.cz, 4);
    // Serial.println("X: " + String(accel.cx, 2) + ", Y: " + String(accel.cy, 2) + ", Z: " + String(accel.cz, 2));
    Particle.publish("sendData", str);
  }

  if (change == true) {
    Particle.publish("sendData", "stop");
    change = false;
  }

	// No need to delay, since our ODR is set to 1Hz, accel.available() will only return 1
	// about once per second.
}