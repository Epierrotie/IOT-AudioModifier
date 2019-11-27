/*
 * Project iot-AudioAccelerometer
 * Description:
 * Author:
 * Date:
 */

#include "SparkFunMMA8452Q.h"

MMA8452Q accel;

void setup() {
  Serial.begin(9600);

  accel.begin(SCALE_2G, ODR_1);
  Particle.function("twitterPost", twitterPost);
}

int twitterPost(String title) {
  Particle.publish("onSongChange", title);
  return (0);
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

	// No need to delay, since our ODR is set to 1Hz, accel.available() will only return 1
	// about once per second.
}