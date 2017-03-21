#include <stdio.h>
#include <unistd.h>
#include <getopt.h>
#include <inttypes.h>
#include <stdlib.h>

static int verbose_flag;

int sendCommand(char* action, uint64_t* device) {
	printf("\n Talking with my NRF24l01+ friends out there....\n");

  unsigned long message = atoi(action);

	printf("Now sending  %lu...", message);
  printf("ok!\n\r");
	sleep(1);

	return 0;
}

int main(int argc, char *argv[]) {
  int opt;

  char* action;
  uint64_t device;

  while(true) {
    static struct option long_options[] = {
  		{"verbose", no_argument, &verbose_flag, 1},
  		{"brief",   no_argument, &verbose_flag, 0},
  		// These options don’t set a flag. We distinguish them by their indices.
  		{"action", required_argument, 0, 'a'},
  		{"device", required_argument, 0, 'd'},
  		{0, 0, 0, 0}
  	};
    // getopt_long stores the option index here.
		int option_index = 0;

		opt = getopt_long (argc, argv, "a:d:", long_options, &option_index);
		//printf ("Opt %d with value %s\n", opt, optarg);

		if (opt == -1) {
			break;
		}

		switch (opt) {
			case 0:
      	/* If this option set a flag, do nothing else now. */
        if (long_options[option_index].flag != 0)
        	break;
				printf ("option %s\n", long_options[option_index].name);
        	if (optarg)
          	printf (" with arg %s\n", optarg);
            break;
			case 'a':
				action = optarg;
				break;
			case 'd':
				device = strtoull(optarg, NULL, 0);
      	break;
		}
  }

  return sendCommand(action, &device);
}
