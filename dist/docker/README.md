# SPHINX DEVICE

STM32L5 (ARM-M V8) emulator for secure messages

## RUN

docker run --rm -e HOSPITAL_ADDR="http://172.17.0.1:9090"  sphinx_device_tecnalia:latest

## TEST

docker run  -it --rm -e HOSPITAL_ADDR="http://172.17.0.1:9090"  sphinx_device_tecnalia:latest