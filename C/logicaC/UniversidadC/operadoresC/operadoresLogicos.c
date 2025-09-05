#include <stdio.h>
#include <stdbool.h>
int main()
    {
        /* 
        and &&
        or ||
        not !
        */
        bool a=true;
        bool b=false;
        printf("a %d\n",a);
        printf("b %d\n",b);
        //Operador and
        bool c=a&&b;
        printf("a y c %d\n",c);
        c=a||b;
        printf("a o b %d\n",c);
        printf("a negada %d\n",!a);
        printf("b negada %d\n",!b);

        return 0;
    }