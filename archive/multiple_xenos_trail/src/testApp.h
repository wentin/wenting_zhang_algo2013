#pragma once

#include "ofMain.h"
#include "ofEvents.h"
#include "rectangle.h"
#include "queueRectangle.h"
#include "queueLine.h"

#define TOTAL_NUMBER 10

class testApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);

        rectangle myRectangle;

        queueRectangle myQueueRectangle;

        queueLine myQueue;
};
