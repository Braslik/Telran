#include <stdio.h>
void f1();
void f2();
void f3();

int main()
{
	printf (" main ");
	f1();
	f2();
	return 0;
}

void f1()
{
	printf (" f1 ");
	f2();
}

void f2()
{
	printf (" f2 ");
	f3();
}

void f3()
{
	printf (" f3 ");
}
